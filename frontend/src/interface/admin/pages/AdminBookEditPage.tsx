import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BookApiRepository } from "../../../infrastructure/api/BookApiRepository"
import { UpdateBookUseCase } from "../../../application/usecases/admin/UpdateBookUseCase"
import "./AdminBookEditPage.css"

export function AdminBookEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [status, setStatus] = useState<"disponible" | "indisponible">("disponible")
  const [loading, setLoading] = useState(true)

  const repository = new BookApiRepository()
  const updateBookUseCase = new UpdateBookUseCase(repository)

  /* ================= FETCH BOOK ================= */
  useEffect(() => {
    if (!id) return

    const fetchBook = async () => {
      try {
        const book = await repository.getById(id)

        setTitle(book.title)
        setAuthor(book.author)
        setStatus(book.status)
      } catch (error) {
        console.error("Erreur récupération livre :", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [id])

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id) return

    try {
      await updateBookUseCase.execute(id, title, author, status)
      navigate("/admin/books")
    } catch (error) {
      console.error("Erreur modification :", error)
    }
  }

  if (loading) {
    return <div className="book-edit-page">Chargement...</div>
  }

  return (
    <div className="book-edit-page">

      <div className="book-edit-header">
        <div>
          <h1>Modifier le livre</h1>
          <p>Mettre à jour les informations</p>
        </div>

        <button
          className="book-edit-back"
          onClick={() => navigate("/admin/books")}
        >
          ← Retour
        </button>
      </div>

      <div className="book-edit-card">
        <form onSubmit={handleSubmit} className="book-edit-form">

          <div className="book-edit-field">
            <label>Titre</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="book-edit-field">
            <label>Auteur</label>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div className="book-edit-field">
            <label>Statut</label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "disponible" | "indisponible")
              }
            >
              <option value="disponible">Disponible</option>
              <option value="indisponible">Indisponible</option>
            </select>
          </div>

          <div className="book-edit-actions">
            <button
              type="button"
              className="book-edit-secondary"
              onClick={() => navigate("/admin/books")}
            >
              Annuler
            </button>

            <button type="submit" className="book-edit-primary">
              Enregistrer
            </button>
          </div>

        </form>
      </div>

    </div>
  )
}