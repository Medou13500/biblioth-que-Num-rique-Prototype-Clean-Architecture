import "./AdminSidebar.css"

export function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-logo">
        Admin Panel
      </div>

      <nav className="admin-sidebar-nav">
        <a href="/admin">Dashboard</a>
        <a href="#">Utilisateurs</a>
        <a href="#">Livres</a>
        <a href="#">Paramètres</a>
      </nav>
    </aside>
  )
}