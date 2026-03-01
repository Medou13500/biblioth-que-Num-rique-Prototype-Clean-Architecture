import { useEffect, useState, useMemo } from "react"
import { BookApiRepository } from "../../../infrastructure/api/BookApiRepository"
import { GetBooksUseCase } from "../../../application/usecases/public/GetBooksUseCase"
import { SubscriptionApiRepository } from "../../../infrastructure/api/SubscriptionApiRepository"
import { BorrowModal } from "../../components/borrow/BorrowModal"
import "./CataloguePage.css"

interface Book {
  id: string
  title: string
  author: string
  status: string
}

export function CataloguePage() {
  const [books, setBooks] = useState<Book[]>([])
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null)

  const bookRepository = useMemo(() => new BookApiRepository(), [])
  const subscriptionRepository = useMemo(() => new SubscriptionApiRepository(), [])

  const getBooksUseCase = useMemo(
    () => new GetBooksUseCase(bookRepository),
    [bookRepository]
  )

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooksUseCase.execute()
        setBooks(data)
      } catch (error) {
        console.error("Erreur récupération catalogue :", error)
      }
    }

    fetchBooks()
  }, [getBooksUseCase])

  const handleBorrow = async (bookId: string) => {
    try {
      const subscription = await subscriptionRepository.getMine()

      if (subscription) {
        await bookRepository.access(bookId)
        alert("Accès autorisé au livre 📖")
      } else {
        setSelectedBookId(bookId)
      }
    } catch {
      setSelectedBookId(bookId)
    }
  }

  const handleSubscriptionSuccess = async () => {
    if (!selectedBookId) return

    await bookRepository.access(selectedBookId)
    alert("Accès autorisé au livre 📖")

    setSelectedBookId(null)
  }

  return (
    <div className="catalogue-page">

      <div className="catalogue-header">
        <h1>Catalogue</h1>
        <p>Découvrez nos livres disponibles</p>
      </div>

      <div className="catalogue-grid">
        {books.map((book) => (
          <div key={book.id} className="catalogue-card">
            <h3>{book.title}</h3>
            <p>{book.author}</p>

            <button
              className="borrow-btn"
              onClick={() => handleBorrow(book.id)}
            >
              Emprunter
            </button>
          </div>
        ))}
      </div>

      {selectedBookId && (
        <BorrowModal
          isOpen={true}
          onClose={() => setSelectedBookId(null)}
          onSuccess={handleSubscriptionSuccess}
        />
      )}

    </div>
  )
}