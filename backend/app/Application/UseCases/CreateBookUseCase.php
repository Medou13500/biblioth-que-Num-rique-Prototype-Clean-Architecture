<?php

namespace App\Application\UseCases;

use App\Domain\Entities\Book;
use App\Domain\Repositories\BookRepositoryInterface;
use Illuminate\Support\Str;

class CreateBookUseCase
{
    private BookRepositoryInterface $bookRepository;

    public function __construct(BookRepositoryInterface $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    public function execute(
        string $title,
        string $author
    ): Book {
        $book = new Book(
            Str::uuid()->toString(),
            $title,
            $author,
            'disponible'
        );

        return $this->bookRepository->save($book);
    }
}                                                                                                      