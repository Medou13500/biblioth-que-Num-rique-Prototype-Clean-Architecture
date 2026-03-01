<?php

namespace App\Domain\Exceptions;

use Exception;

class BookNotFoundException extends Exception
{
    public function __construct()
    {
        parent::__construct('Book not found.');
    }
}