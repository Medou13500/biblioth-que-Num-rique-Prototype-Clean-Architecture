import { AuthRepository } from "../../../domain/repositories/AuthRepository"
import { User } from "../../../domain/entities/User"

export class AdminLoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(email: string, password: string): Promise<User> {

    const user = await this.authRepository.loginAdmin(email, password)

    if (user.role !== "ADMIN") {
      throw new Error("Accès réservé aux administrateurs")
    }

    return user
  }
}