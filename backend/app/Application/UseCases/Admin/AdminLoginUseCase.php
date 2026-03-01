<?php

namespace App\Application\UseCases\Admin;

use App\Domain\Repositories\UserRepositoryInterface;
use App\Domain\Exceptions\InvalidCredentialsException;
use App\Domain\Exceptions\AccessDeniedException;
use Illuminate\Support\Facades\Hash;

class AdminLoginUseCase
{
    private UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function execute(string $email, string $password)
    {
        $user = $this->userRepository->findByEmail($email);

        if (!$user) {
            throw new InvalidCredentialsException("Identifiants invalides");
        }

        if (!Hash::check($password, $user->getPasswordHash())) {
            throw new InvalidCredentialsException("Identifiants invalides");
        }

        if ($user->getRole() !== 'ADMIN') {
            throw new AccessDeniedException("Accès réservé aux administrateurs");
        }

        return $user;
    }
}