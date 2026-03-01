import { BookRepository, DashboardStats } from "../../../domain/repositories/BookRepository"

export class GetDashboardStatsUseCase {
  constructor(private repository: BookRepository) {}

  async execute(): Promise<DashboardStats> {
    return this.repository.getDashboardStats()
  }
}