import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./Header.css";

const Header = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <header className="header">
        <Link to="/catalogue" className="logo" onClick={closeMenu}>
          Bibliothèque
        </Link>

        <div
          className={`nav-toggle ${isOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </div>

        <nav className={`nav ${isOpen ? "open" : ""}`}>
          {user ? (
            <>
              {/* ADMIN */}
              {user.role === "ADMIN" && (
                <Link to="/admin/dashboard" onClick={closeMenu}>
                  Dashboard Admin
                </Link>
              )}

              {/* USER connecté */}
              <button
                className="btn-logout"
                onClick={() => {
                  logout();
                  closeMenu();
                }}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>
                Se connecter
              </Link>

              <Link to="/register" onClick={closeMenu}>
                S'inscrire
              </Link>

              <Link to="/admin/login" className="nav-admin" onClick={closeMenu}>
                Connexion admin
              </Link>
            </>
          )}
        </nav>
      </header>

      {isOpen && <div className="nav-overlay" onClick={closeMenu} />}
    </>
  );
};

export default Header;
