import { Link } from "react-router-dom"
import "./HomePage.css"

export function HomePage() {
  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Accédez à votre <span>bibliothèque numérique</span>
          </h1>
          <p>
            Consultez vos livres en ligne, gérez vos abonnements
            et profitez d’un accès sécurisé à votre contenu.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="btn-primary">
              Créer un compte
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature-card">
          <h3>📚 Lecture illimitée</h3>
          <p>
            Accédez à tous vos livres depuis n’importe quel appareil,
            à tout moment.
          </p>
        </div>

        <div className="feature-card">
          <h3>🔐 Accès sécurisé</h3>
          <p>
            Système d’authentification robuste et gestion des rôles
            administrateur / utilisateur.
          </p>
        </div>

        <div className="feature-card">
          <h3>⚡ Interface moderne</h3>
          <p>
            Catalogue rapide, UX pensée SaaS et architecture
            scalable propre.
          </p>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta">
        <h2>Prêt à commencer votre lecture ?</h2>
        <Link to="/register" className="cta-button">
          Rejoindre maintenant
        </Link>
      </section>

    </div>
  )
}