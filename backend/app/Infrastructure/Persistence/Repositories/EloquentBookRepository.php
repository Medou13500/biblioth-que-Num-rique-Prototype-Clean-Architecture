<?php

namespace App\Infrastructure\Persistence\Repositories;

use App\Domain\Entities\Book;
use App\Domain\Repositories\BookRepositoryInterface;
use App\Models\Book as EloquentBook;
use Illuminate\Support\Str;

class EloquentBookRepository implements BookRepositoryInterface
{
    public function save(Book $book): Book
    {
        EloquentBook::create([
            'id' => Str::uuid(),
            'title' => $book->getTitle(),
            'author' => $book->getAuthor(),
            'status' => $book->getStatus(),
        ]);

        return $book;
    }

    public function findAll(): array
    {
        return EloquentBook::all()
            ->map(function ($model) {
                return new Book(
                    $model->id,
                    $model->title,
                    $model->author,
                    $model->status
                );
            })
            ->toArray();
    }

    public function update(Book $book): Book
    {
        $model = EloquentBook::find($book->getId());

        if (!$model) {
            throw new \Exception("Book not found");
        }

        $model->title = $book->getTitle();
        $model->author = $book->getAuthor();
        $model->status = $book->getStatus();
        $model->save();

        return new Book(
            $model->id,
            $model->title,
            $model->author,
            $model->status
        );
    }
    public function findById(string $id): ?Book
{
    $model = EloquentBook::find($id);

    if (!$model) {
        return null;
    }

    return new Book(
        $model->id,
        $model->title,
        $model->author,
        $model->status
    );
}

    public function delete(string $id): void
    {
        EloquentBook::where('id', $id)->delete();
    }
}