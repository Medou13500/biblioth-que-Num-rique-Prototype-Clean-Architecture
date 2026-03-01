import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import "./AdminHeader.css"

export function AdminHeader() {
  const navigate = useNavigate()
  const [user, setUser] = useState<{ email: string; role: string } | null>(null)

  useEffect(() => {
    const rawUser = localStorage.getItem("user")
    if (!rawUser) return

    try {
      const parsedUser = JSON.parse(rawUser)
      setUser(parsedUser)
    } catch {
      console.error("Erreur parsing user")
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/admin/login")
  }

  return (
    <header className="admin-header">
      <div className="admin-header-right">
        {user && (
          <div className="admin-user-info">
            <span className="admin-email">{user.email}</span>
            <span className="admin-role-badge">{user.role}</span>
          </div>
        )}

        <button
          className="admin-logout-button"
          onClick={handleLogout}
        >
          Déconnexion
        </button>
      </div>
    </header>
  )
}