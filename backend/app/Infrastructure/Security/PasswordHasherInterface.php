<?php

namespace App\Infrastructure\Security;

interface PasswordHasherInterface
{
    public function verify(string $plainPassword, string $hashedPassword): bool;

    public function hash(string $plainPassword): string;
}