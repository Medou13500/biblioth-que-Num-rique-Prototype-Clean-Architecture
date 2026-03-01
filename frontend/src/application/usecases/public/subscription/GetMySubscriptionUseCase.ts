import { Subscription } from "../../../../domain/entities/Subscription"
import { SubscriptionRepository } from "../../../../domain/repositories/SubscriptionRepository"

export class GetMySubscriptionUseCase {
  constructor(private repository: SubscriptionRepository) {}

  async execute(userId: string): Promise<Subscription | null> {
    if (!userId) {
      throw new Error("Utilisateur non identifié")
    }

    return await this.repository.getMine(userId)
  }
}