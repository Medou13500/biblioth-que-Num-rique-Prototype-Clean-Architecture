<?php

namespace App\Application\UseCases;

use App\Domain\Repositories\BookRepositoryInterface;

class DeleteBookUseCase
{
    private BookRepositoryInterface $bookRepository;

    public function __construct(BookRepositoryInterface $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    public function execute(string $id): void
    {
        $this->bookRepository->delete($id);
    }
}