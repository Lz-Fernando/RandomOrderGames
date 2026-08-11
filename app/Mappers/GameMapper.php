<?php

declare(strict_types=1);

namespace App\Mappers;

use App\Data\Game;

final class GameMapper
{
    public function map(array $data): Game
    {
        $id = $data['id'] ?? null;
        $title = $data['name'] ?? null;

        if (! is_numeric($id)) {
            throw new \InvalidArgumentException(
                'Registro da IGDB sem ID válido'
            );
        }

        if (! is_string($title) || trim($title) === '') {
            throw new \InvalidArgumentException(
                'Registro da IGDB sem título válido'
            );
        }

        $rating = $data['rating'] ?? null;
        $popularity = $data['popularity'] ?? null;

        $rating = is_numeric($rating) ? (float) $rating : null;
        $popularity = is_numeric($popularity) ? (float) $popularity : null;

        $imageId = $data['cover']['image_id'] ?? null;
        $coverUrl = $this->buildCoverUrl(is_string($imageId) ? $imageId : null) ?? null;

        return new Game(
            id: (int) $id,
            title: trim($title),
            coverUrl: $coverUrl,
            rating: $rating,
            popularity: $popularity,
        );
    }

    private function buildCoverUrl(?string $imageId): ?string
    {
        $imageBaseUrl = config('igdb.image_base_url');

        if (!$imageBaseUrl || $imageBaseUrl === '') {
            return null;
        }

        return rtrim($imageBaseUrl, '/') . '/t_cover_big/' . $imageId . '.jpg';
    }
}
