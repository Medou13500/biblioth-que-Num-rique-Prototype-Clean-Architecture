<?php

namespace App\Domain\Exceptions;

use Exception;

class SubscriptionExpiredException extends Exception
{
    protected $message = 'Subscription expired or inactive.';
}