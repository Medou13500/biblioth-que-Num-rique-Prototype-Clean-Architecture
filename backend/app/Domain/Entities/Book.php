<?php

namespace App\Domain\Entities;

class Book
{
    private string $id;
    private string $title;
    private string $author;
    private string $status;

    public function __construct(
        string $id,
        string $title,
        string $author,
        string $status
    ) {
        $this->id = $id;
        $this->title = $title;
        $this->author = $author;
        $this->status = $status;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getAuthor(): string
    {
        return $this->author;
    }

    public function getStatus(): string
    {
        return $this->status;
    }
}