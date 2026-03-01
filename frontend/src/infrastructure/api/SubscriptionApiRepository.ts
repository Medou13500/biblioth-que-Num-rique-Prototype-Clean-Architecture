import api from "./api"
import {
  SubscriptionRepository,
  CreateSubscriptionInput
} from "../../domain/repositories/SubscriptionRepository"
import { Subscription } from "../../domain/entities/Subscription"

interface ApiResponse<T> {
  status: string
  data: T
}

export class SubscriptionApiRepository implements SubscriptionRepository {

  private getConnectedUserId(): string {
    const storedUser = localStorage.getItem("user")

    if (!storedUser) {
      throw new Error("Utilisateur non connecté")
    }

    let parsedUser: { id: string }

    try {
      parsedUser = JSON.parse(storedUser)
    } catch {
      throw new Error("Utilisateur invalide en localStorage")
    }

    if (!parsedUser.id || parsedUser.id === "0") {
      throw new Error("Identifiant utilisateur invalide")
    }

    return parsedUser.id
  }

  async create(input: CreateSubscriptionInput): Promise<Subscription> {

    const userId = this.getConnectedUserId()

    const response = await api.post<ApiResponse<Subscription>>(
      "/subscriptions",
      {
        type: input.type,
        start_date: input.start_date,
        end_date: input.end_date
      },
      {
        headers: {
          "x-user-id": userId
        }
      }
    )

    return response.data.data
  }

  async getMySubscription(): Promise<Subscription | null> {
    try {

      const userId = this.getConnectedUserId()

      const response = await api.get<ApiResponse<Subscription>>(
        "/subscriptions/me",
        {
          headers: {
            "x-user-id": userId
          }
        }
      )

      return response.data.data

    } catch {
      return null
    }
  }

  async getMine(): Promise<Subscription | null> {
    return this.getMySubscription()
  }
}