import { Navigate, Outlet } from "react-router-dom"

export function AdminProtectedRoute() {
  const raw = localStorage.getItem("user")
  if (!raw) return <Navigate to="/admin/login" replace />

  let user: any = null
  try {
    user = JSON.parse(raw)
  } catch {
    return <Navigate to="/admin/login" replace />
  }

  const role = String(user?.role ?? "").toUpperCase()

  if (role !== "ADMIN") {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}