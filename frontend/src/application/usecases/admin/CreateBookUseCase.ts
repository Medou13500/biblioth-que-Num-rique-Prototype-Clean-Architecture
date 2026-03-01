import { BookRepository } from "../../../domain/repositories/BookRepository"

export class CreateBookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(
    title: string,
    author: string,
    status: string
  ): Promise<void> {
    if (!title.trim() || !author.trim()) {
      throw new Error("Titre et auteur requis")
    }

    await this.bookRepository.create(title, author, status)
  }
}