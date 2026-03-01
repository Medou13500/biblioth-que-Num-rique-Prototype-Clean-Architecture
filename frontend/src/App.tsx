import { Routes, Route } from "react-router-dom"

/* ===== Layouts ===== */
import MainLayout from "./interface/public/layout/MainLayout"
import AdminLayout from "./interface/admin/layout/AdminLayout"

/* ===== Public Pages ===== */
import { HomePage } from "./interface/public/pages/HomePage"
import { CataloguePage } from "./interface/public/pages/CataloguePage"
import { LoginPage } from "./interface/public/pages/LoginPage"
import { RegisterPage } from "./interface/public/pages/RegisterPage"

/* ===== Admin Pages ===== */
import { AdminLoginPage } from "./interface/admin/pages/AdminLoginPage"
import { AdminDashboardPage } from "./interface/admin/pages/AdminDashboardPage"
import { AdminBooksPage } from "./interface/admin/pages/AdminBooksPage"
import { AdminBookCreatePage } from "./interface/admin/pages/AdminBookCreatePage"
import { AdminBookEditPage } from "./interface/admin/pages/AdminBookEditPage"

function App() {
  return (
    <Routes>
      {/* ===== PUBLIC ===== */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogue" element={<CataloguePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* ===== ADMIN ===== */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/books" element={<AdminBooksPage />} />
        <Route path="/admin/books/create" element={<AdminBookCreatePage />} />
        <Route path="/admin/books/edit/:id" element={<AdminBookEditPage />} />
      </Route>

    </Routes>
  )
}

export default App