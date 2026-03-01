import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./AdminBooksPage.css"

interface Book {
  id: string
  title: string
  author: string
  status: string
}

export function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("user") || "{}")

  /* ================= FETCH BOOKS ================= */
  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/books",
        {
          headers: {
            "x-user-email": user.email
          }
        }
      )

      setBooks(response.data.data)
    } catch (error) {
      console.error("Erreur récupération livres :", error)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  /* ================= DELETE BOOK ================= */
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/books/${id}`,
        {
          headers: {
            "x-user-email": user.email
          }
        }
      )

      // Refresh après suppression
      fetchBooks()

    } catch (error) {
      console.error("Erreur suppression :", error)
    }
  }

  return (
    <div className="books-page">

      {/* HEADER */}
      <div className="books-header">
        <h1>Gestion des livres</h1>
        <p>Administration du catalogue</p>
      </div>

      {/* TABLE CARD */}
      <div className="books-card">
        <table className="books-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Auteur</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>

                <td>
                  <span
                    className={
                      book.status === "disponible"
                        ? "status-available"
                        : "status-unavailable"
                    }
                  >
                    {book.status}
                  </span>
                </td>

                <td className="actions">
                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(`/admin/books/edit/${book.id}`)
                    }
                  >
                    Modifier
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(book.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER BUTTON */}
      <div className="books-footer">
        <button
          className="books-primary-btn"
          onClick={() => navigate("/admin/books/create")}
        >
          + Ajouter un livre
        </button>
      </div>

    </div>
  )
}