import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { CreateBookUseCase } from "../../../application/usecases/admin/CreateBookUseCase"
import { BookApiRepository } from "../../../infrastructure/api/BookApiRepository"
import "./AdminBookCreatePage.css"

export function AdminBookCreatePage() {
  const navigate = useNavigate()

  const [title, setTitle] = useState<string>("")
  const [author, setAuthor] = useState<string>("")
  const [status, setStatus] = useState<string>("disponible")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const repository = new BookApiRepository()
    const useCase = new CreateBookUseCase(repository)

    try {
      await useCase.execute(title, author, status)
      navigate("/admin/books")
    } catch (error) {
      alert("Erreur lors de la création du livre")
    }
  }

  return (
    <div className="book-create-page">

      {/* ===== HEADER ===== */}
      <div className="book-create-header">
        <div>
          <h1>Ajouter un livre</h1>
          <p>Ajoutez un nouveau livre au catalogue</p>
        </div>
      </div>

      {/* ===== CARD ===== */}
      <div className="book-create-card">
        <form className="book-create-form" onSubmit={handleSubmit}>

          <div className="book-create-field">
            <label>Titre</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Clean Code"
              required
            />
          </div>

          <div className="book-create-field">
            <label>Auteur</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Ex: Robert C. Martin"
              required
            />
          </div>

          <div className="book-create-field">
            <label>Statut</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="disponible">Disponible</option>
              <option value="indisponible">Indisponible</option>
            </select>
          </div>

          <div className="book-create-actions">
            <button
              type="button"
              className="book-create-secondary"
              onClick={() => navigate("/admin/books")}
            >
              Annuler
            </button>

            <button type="submit" className="book-create-primary">
              Créer
            </button>
          </div>

        </form>
      </div>

      {/* ===== BOUTON RETOUR EN BAS ===== */}
      <div className="book-create-bottom">
        <button
          className="book-create-back"
          onClick={() => navigate("/admin/books")}
        >
          ← Retour à la liste
        </button>
      </div>

    </div>
  )
}