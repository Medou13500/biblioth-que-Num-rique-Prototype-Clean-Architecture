import { Outlet } from "react-router-dom"
import Header from "../../public/components/Header"

const AdminLayout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Header />

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer
        style={{
          textAlign: "center",
          padding: "1.2rem",
          backgroundColor: "#0c1c3f", // 🔥 même couleur que header
          color: "white",
          borderTop: "1px solid rgba(255,255,255,0.05)"
        }}
      >
        © Admin - Bibliothèque Numérique
      </footer>
    </div>
  )
}

export default AdminLayout