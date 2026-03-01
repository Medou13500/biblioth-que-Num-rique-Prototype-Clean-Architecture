import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import { Footer } from "../components/Footer"

const MainLayout = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main style={{ flex: 1, padding: "2rem" }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout