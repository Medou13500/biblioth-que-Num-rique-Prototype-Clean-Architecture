<?php

namespace App\Domain\Exceptions;

use Exception;

class EmailAlreadyUsedException extends Exception
{
    public function __construct()
    {
        parent::__construct('Email already used.');
    }
}