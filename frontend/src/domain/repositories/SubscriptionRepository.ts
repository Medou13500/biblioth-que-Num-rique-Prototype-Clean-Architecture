import { Subscription } from "../entities/Subscription"

export interface CreateSubscriptionInput {
  type: string
  start_date: string
  end_date: string
}

export interface SubscriptionRepository {
  create(input: CreateSubscriptionInput): Promise<Subscription>
  getMine(): Promise<Subscription | null>
}