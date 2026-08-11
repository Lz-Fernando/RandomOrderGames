<?php

namespace App\Http\Controllers;

use App\Exceptions\IgdbRequestException;
use App\Services\GameService;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Log;

final class HomeController
{
    public function __construct(
        private readonly GameService $gameService,
    ) {

    }

    public function index(): View
    {
        try {
            $games = $this->gameService->popularGames();

            return view('home', [
                'games' => $games,
                'hasError' => false,
            ]);
        } catch (IgdbRequestException $exception) {
            Log::error('Não foi possível carregar os jogos da home.', [
                'exception' => $exception::class,
            ]);

            return view('home', [
                'games' => [],
                'hasError' => true,
            ]);
        }
    }
}
