import { BookRepository } from "../../../domain/repositories/BookRepository"

export class GetBooksUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute() {
    return await this.bookRepository.getAll()
  }
}