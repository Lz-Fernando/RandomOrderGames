<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Random Order Games</title>
    </head>
    <body>
        <aside>
            <h1>Random Order Games</h1>
        </aside>

        <div>
            @if ($hasError)
                <p>Não foi possível carregar os jogos no momento.</p>
            @else
                @forelse ($games as $game)
                    <div>
                        @if ($game->coverUrl)
                            <img
                                src="{{ $game->coverUrl }}"
                                alt="{{ $game->title }}"
                            >
                        @else
                            <div>Sem capa</div>
                        @endif
                        <p>{{ $game->title }}</p>
                        @if ($game->rating !== null)
                            <span>{{ number_format($game->rating, 1) }}</span>
                        @else
                            <span>Sem avaliação</span>
                        @endif
                    </div>
                @empty
                    <p>Nenhum jogo disponível no momento.</p>
                @endforelse
            @endif
        </div>
    </body>
</html>
