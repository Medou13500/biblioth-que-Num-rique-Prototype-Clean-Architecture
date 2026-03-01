import "./Footer.css"
import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-col brand">
          <h3>Bibliothèque Numérique</h3>
          <p>
            Une plateforme moderne pensée pour les passionnés
            de lecture numérique.
          </p>
        </div>

        <div className="footer-col">
          <h4>Navigation</h4>
          <Link to="/catalogue">Catalogue</Link>
          <Link to="/login">Connexion</Link>
          <Link to="/register">Inscription</Link>
        </div>

        <div className="footer-col">
          <h4>Légal</h4>
          <a href="#">Mentions légales</a>
          <a href="#">Confidentialité</a>
          <a href="#">Conditions</a>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Bibliothèque Numérique — Tous droits réservés
      </div>
    </footer>
  )
}