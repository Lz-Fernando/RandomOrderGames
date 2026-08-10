<?php

declare(strict_types=1);

namespace App\Services\IGDB;

use App\Exceptions\IgdbAuthenticationException;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

final class TwitchAccessToken
{
    private const CACHE_KEY = 'igdb.access_token';

    private const REQUEST_TIMEOUT_SECONDS = 10;

    private const MAX_CACHE_SAFETY_MARGIN_SECONDS = 300;

    /**
     * Retorna um token válido, reutilizando o cache quando possivel.
     *
     * @throws IgdbAuthenticationException
     */
    public function get(): string
    {
        $cachedToken = Cache::get(self::CACHE_KEY);

        if (is_string($cachedToken) && $cachedToken !== '') {
            Log::debug('Token de acesso da IGDB recuperado do cache.');

            return $cachedToken;
        }

        return $this->requestNewToken();
    }

    /**
     * Remove o token atualmente armazenado.
     */
    public function invalidate(): void
    {
        Cache::forget(self::CACHE_KEY);

        Log::info('Token de acesso da IGDB removido do cache.');
    }

    /**
     * @throws IgdbAuthenticationException
     */
    public function requestNewToken(): string
    {
        $configuration = $this->configuration();

        Log::info('Iniciando autenticação da IGDB na Twitch');

        try {
            $response = Http::asForm()
                ->acceptJson()
                ->timeout(self::REQUEST_TIMEOUT_SECONDS)
                ->post($configuration['twitch_authentication_url'], [
                    'client_id' => $configuration['igdb_client_id'],
                    'client_secret' => $configuration['igdb_client_secret'],
                    'grant_type' => 'client_credentials',
                ]);
        } catch (ConnectionException $exception) {
            Log::warning('Timeuout ou falha de conexão ao autenticar na Twitch');

            throw new IgdbAuthenticationException(
                'Não foi possível conectar ao serviço de autenticação da Twitch.',
                previous: $exception,
            );
        } catch (Throwable $exception) {
            Log::error('Erro inesperado ao autenticar na Twitch.', [
                'exception' => $exception::class,
            ]);

            throw new IgdbAuthenticationException(
                'Ocorreu um erro inesperado durante a autenticação da IGDB.',
                previous: $exception,
            );
        }

        if ($response->failed()) {
            Log::warning('A Twitch rejeitou a autenticação da IGDB.', [
                'status' => $response->status(),
            ]);

            throw new IgdbAuthenticationException(
                sprintf(
                    'A autenticação da IGDB falhoou com o código HTTP %d.',
                    $response->status(),
                ),
            );
        }

        $token = $response->json('access_token');
        $expiresIn = $response->json('expires_in');
        $tokenType = $response->json('token_type');

        if (
            ! is_string($token)
            || $token === ''
            || ! is_numeric($expiresIn)
            || (int) $expiresIn <= 0
            || ! is_string($tokenType)
            || $tokenType === ''
        ) {
            Log::error('A Twitch retornou uma resposta de autenticação inválida.', [
                'status' => $response->status(),
                'has_access_token' => is_string($token) && $token !== '',
                'has_valid_expiration' => is_numeric($expiresIn) && (int) $expiresIn > 0,
                'has_token_type' => is_string($tokenType) && $tokenType !== '',
            ]);

            throw new IgdbAuthenticationException(
                'A Twitch retornou uma resposta de autenticação inválida.',
            );
        }

        $cacheLifeTime = $this->cacheLifeTime((int) $expiresIn);

        Cache::put(
            self::CACHE_KEY,
            $token,
            $cacheLifeTime,
        );

        Log::info('Novo token de acesso da IGDB armazenado no cache.', [
            'token_type' => $tokenType,
            'cache_lifetime_seconds' => $cacheLifeTime,
        ]);

        return $token;
    }

    /**
     * @return array{
     *      igdb_client_id: string,
     *      igdb_client_secret: string,
     *      twitch_authentication_url: string
     * }
     *
     * @throws IgdbAuthenticationException
     */
    private function configuration(): array
    {
        $clientId = config('igdb.igdb_client_id');
        $clientSecret = config('igdb.igdb_client_secret');
        $authUrl = config('igdb.twitch_autentication_url');

        if (
            ! is_string($clientId)
            || $clientId === ''
            || ! is_string($clientSecret)
            || $clientSecret === ''
            || ! is_string($authUrl)
            || $authUrl === ''
        ) {
            Log::error('Configuração de autenticação da IGDB incompleta.');

            throw new IgdbAuthenticationException(
                'Configuração de autenticação da IGDB incompleta.',
            );
        }

        if (filter_var($authUrl, FILTER_VALIDATE_URL) === false) {
            Log::error('A URL de autenticação da IGDB é inválido.');

            throw new IgdbAuthenticationException(
                'A URL de autenticação da IGDB é inválida.',
            );
        }

        return [
            'igdb_client_id' => $clientId,
            'igdb_client_secret' => $clientSecret,
            'twitch_authentication_url' => $authUrl,
        ];
    }

    private function cacheLifeTime(int $expiresIn): int
    {
        /**
         * Usa uma margem de 10% da validade, limitada a cinco minutos
         *
         * Exemplos:
         * - Token válido por i hora: margem de 5 minutos.
         * - Token válido por 2 minutos: margem de 12 segundos.
         */
        $safetyMargin = min(
            self::MAX_CACHE_SAFETY_MARGIN_SECONDS,
            max(1, intdiv($expiresIn, 10)),
        );

        return max(1, $expiresIn - $safetyMargin);
    }
}
