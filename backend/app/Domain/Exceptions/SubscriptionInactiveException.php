<?php

namespace App\Domain\Exceptions;

use Exception;

class SubscriptionInactiveException extends Exception
{
    public function __construct()
    {
        parent::__construct('Subscription inactive.');
    }
}