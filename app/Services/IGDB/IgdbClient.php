<?php

declare(strict_types=1);

namespace App\Services\IGDB;

use App\Exceptions\IgdbRequestException;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Log;

final class IgdbClient
{
    private const TIMEOUT = 10;

    public function __construct(
        private readonly TwitchAccessToken $accessToken,
    ) {

    }

    public function query(string $endpoint, string $query): array
    {
        $token = $this->accessToken->get();

        $clientId = config('igdb.igdb_client_id');
        $baseUrl = config('igdb.igdb_base_url');

        if (
            ! is_string($baseUrl)
            || $baseUrl === ''
            || ! is_string($clientId)
            || $clientId === ''
        ) {
            throw new IgdbRequestException('Configuração da IGDB incompleta.');
        }

        $urlFinal = rtrim($baseUrl, '/') . '/' . ltrim($endpoint, '/');

        $response = $this->send($baseUrl, $query, $token, $clientId);

        if ($response->status() === 401) {
            Log::warning('A IGDB rejeitou o token. Um novo token será solicitado.');

            $this->accessToken->invalidate();

            $newToken = $this->accessToken->get();

            $response = $this->send($urlFinal, $query, $newToken, $clientId);
        }

        if ($response->failed()) {
            Log::warning('A requisição à IGDB falhou.', [
                'endpoint' => $endpoint,
                'status' => $response->status(),
            ]);

            throw new IgdbRequestException(
                sprintf(
                    'A requisição à IGDB falhou com o código HTTP %d.',
                    $response->status(),
                ),
            );
        }

        $data = $response->json();

        if (! is_array($data)) {
            throw new IgdbRequestException('A IGDB retornou uma resposta inválida.');
        }

        return $data;
    }

    private function send(string $url, string $query, string $token, string $clientId): Response
    {
        try {
            return Http::withHeaders([
                'Client-ID' => $clientId,
                'Accept' => 'application/json',
            ])
                ->withToken($token)
                ->timeout(self::TIMEOUT)
                ->withBody($query, 'text/plain')
                ->post($url);
        } catch (ConnectionException $exception) {
            Log::warning('Falha de conexão ao acessar a IGDB.');

            throw new IgdbRequestException(
                'Não foi possível conectar à IGDB.',
                previous: $exception,
            );
        }

    }
}
