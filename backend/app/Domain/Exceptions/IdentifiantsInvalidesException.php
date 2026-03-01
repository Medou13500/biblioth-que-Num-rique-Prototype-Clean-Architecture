<?php

namespace App\Domain\Exceptions;

use Exception;

class IdentifiantsInvalidesException extends Exception
{
    public function __construct()
    {
        parent::__construct("Identifiants invalides.");
    }
}