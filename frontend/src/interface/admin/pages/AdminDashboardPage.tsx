import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { GetDashboardStatsUseCase } from "../../../application/usecases/admin/GetDashboardStatsUseCase"
import { BookApiRepository } from "../../../infrastructure/api/BookApiRepository"
import "./AdminDashboardPage.css"

export function AdminDashboardPage() {
  const navigate = useNavigate()

  const [totalBooks, setTotalBooks] = useState(0)
  const [availableBooks, setAvailableBooks] = useState(0)
  const [unavailableBooks, setUnavailableBooks] = useState(0)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const repository = new BookApiRepository()
        const useCase = new GetDashboardStatsUseCase(repository)

        const stats = await useCase.execute()

        setTotalBooks(stats.total)
        setAvailableBooks(stats.available)
        setUnavailableBooks(stats.unavailable)
      } catch (err) {
        setError("Impossible de charger les statistiques.")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="admin-dashboard">

      {/* ===== Top Section ===== */}
      <div className="dashboard-header">
        <div>
          <h1>Tableau de bord Administrateur</h1>
          <p>Vue d’ensemble de la bibliothèque numérique</p>
        </div>

        <button
          className="dashboard-btn"
          onClick={() => navigate("/admin/books")}
        >
          Gérer les livres
        </button>
      </div>

      {/* ===== Loading State ===== */}
      {loading && (
        <div className="dashboard-loading">
          Chargement des statistiques...
        </div>
      )}

      {/* ===== Error State ===== */}
      {error && (
        <div className="dashboard-error">
          {error}
        </div>
      )}

      {/* ===== Cards Section ===== */}
      {!loading && !error && (
        <div className="dashboard-grid">

          <div className="dashboard-card fade-in">
            <h3>Total Livres</h3>
            <span className="stat-number">{totalBooks}</span>
          </div>

          <div className="dashboard-card fade-in">
            <h3>Disponibles</h3>
            <span className="stat-number success">{availableBooks}</span>
          </div>

          <div className="dashboard-card fade-in">
            <h3>Indisponibles</h3>
            <span className="stat-number danger">{unavailableBooks}</span>
          </div>

        </div>
      )}

      {/* ===== Activity Section ===== */}
      <div className="dashboard-section">
        <h2>Activité récente</h2>
        <ul>
          <li>📚 Nouveau livre ajouté</li>
          <li>✏️ Livre modifié</li>
          <li>🗑️ Livre supprimé</li>
        </ul>
      </div>

    </div>
  )
}