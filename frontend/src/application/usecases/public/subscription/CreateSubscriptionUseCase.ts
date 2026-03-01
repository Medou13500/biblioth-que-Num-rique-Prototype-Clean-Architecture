
import { Subscription } from "../../../../domain/entities/Subscription"
import {
  SubscriptionRepository
} from "../../../../domain/repositories/SubscriptionRepository"

export class CreateSubscriptionUseCase {
  constructor(private readonly repository: SubscriptionRepository) {}

  async execute(type: string): Promise<Subscription> {

    const today = new Date()
    const end = new Date()
    end.setDate(today.getDate() + 30)

    return this.repository.create({
      type,
      start_date: today.toISOString().split("T")[0],
      end_date: end.toISOString().split("T")[0]
    })
  }
}