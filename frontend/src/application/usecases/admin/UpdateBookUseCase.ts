import { BookRepository } from "../../../domain/repositories/BookRepository"

export class UpdateBookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(
    id: string,
    title: string,
    author: string,
    status: string
  ): Promise<void> {

    if (!title || !author || !status) {
      throw new Error("Tous les champs sont obligatoires")
    }

    await this.bookRepository.update(id, title, author, status)
  }
}