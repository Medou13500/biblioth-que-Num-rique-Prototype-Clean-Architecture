<?php

namespace App\Domain\Repositories;

use App\Domain\Entities\Book;

interface BookRepositoryInterface
{
    public function save(Book $book): Book;

    public function findAll(): array;

    public function update(Book $book): Book;

    public function delete(string $id): void;
}