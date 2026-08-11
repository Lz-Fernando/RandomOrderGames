<?php

declare(strict_types=1);

namespace App\Services;

use App\Services\IGDB\IgdbClient;
use App\Mappers\GameMapper;
use InvalidArgumentException;
use Illuminate\Support\Facades\Log;
use App\Data\Game;

final class GameService
{
    public function __construct(
        private readonly IgdbClient $igdbClient,
        private readonly GameMapper $gameMapper,
    )
    {

    }

    /**
     * @return Game[]
     */
    public function popularGames(): array
    {
        $query = '
            fields id,name,cover.image_id,rating,popularity;
            sort popularity desc;
            limit 9;
        ';

        $records = $this->igdbClient->query('games', $query);
        $games = [];

        foreach ($records as $record) {
            try {
                $games[] = $this->gameMapper->map($record);
            } catch (InvalidArgumentException $exception) {
                Log::warning('Registro inválido da IGDB ignorado durante o mapeamento.', [
                    'game_id' => $record['id'] ?? null,
                ]);
            }
        }

        return $games;
    }


}
