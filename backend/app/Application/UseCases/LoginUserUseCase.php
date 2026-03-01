<?php

namespace App\Application\UseCases;

use App\Domain\Repositories\UserRepositoryInterface;
use App\Domain\Exceptions\InvalidCredentialsException;
use App\Domain\Exceptions\AccessDeniedException;
use Illuminate\Support\Facades\Hash;

class LoginUserUseCase
{
    private UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function execute(string $email, string $password)
    {
        //  Vérifier que l'utilisateur existe
        $user = $this->userRepository->findByEmail($email);

        if (!$user) {
            throw new InvalidCredentialsException("Identifiants invalides");
        }

        //  Vérifier le mot de passe
        if (!Hash::check($password, $user->getPasswordHash())) {
            throw new InvalidCredentialsException("Identifiants invalides");
        }

        // Règle métier : un ADMIN ne peut pas passer par login user
        if ($user->getRole() === 'ADMIN') {
            throw new AccessDeniedException(
                "Les administrateurs doivent utiliser l'accès admin."
            );
        }

        // 4OK
        return $user;
    }
}