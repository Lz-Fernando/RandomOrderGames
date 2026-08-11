<?php

declare(strict_types=1);

namespace App\Data;

final readonly class Game
{
    public function __construct(
        public int $id,
        public string $title,
        public ?string $coverUrl,
        public ?float $rating,
        public ?float $popularity,
    ) {

    }
}
