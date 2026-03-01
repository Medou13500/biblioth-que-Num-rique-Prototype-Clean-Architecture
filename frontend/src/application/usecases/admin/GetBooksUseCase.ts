import { BookRepository, Book } from "../../../domain/repositories/BookRepository"

export class GetBooksUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(): Promise<Book[]> {
    const books = await this.bookRepository.getAll()

    // Catalogue public = seulement livres disponibles
    return books.filter((book) => book.status === "disponible")
  }
}