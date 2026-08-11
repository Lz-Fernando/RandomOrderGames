<?php

declare(strict_types=1);

namespace App\Services;

use App\Services\IGDB\IgdbClient;

final class GameService
{
    public function __construct(
        private readonly IgdbClient $igdbClient,
    )
    {

    }

    public function getPopularGames(): array
    {
        return [];
    }


}
