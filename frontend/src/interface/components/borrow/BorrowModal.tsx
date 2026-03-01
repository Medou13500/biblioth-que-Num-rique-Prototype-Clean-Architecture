import { useMemo, useState } from "react";
import { SubscriptionApiRepository } from "../../../infrastructure/api/SubscriptionApiRepository";
import { CreateSubscriptionUseCase } from "../../../application/usecases/public/subscription/CreateSubscriptionUseCase";

import "./BorrowModal.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type Step = "plans" | "payment" | "success";

export function BorrowModal({ isOpen, onClose, onSuccess }: Props) {
  const [step, setStep] = useState<Step>("plans");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const repository = useMemo(() => new SubscriptionApiRepository(), []);
  const createUseCase = useMemo(
    () => new CreateSubscriptionUseCase(repository),
    [repository]
  );

  const handleSelectPlan = () => {
    setStep("payment");
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      await createUseCase.execute("premium");

      setStep("success");

      if (onSuccess) {
        onSuccess();
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Erreur abonnement";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {step === "plans" && (
          <>
            <div className="modal-header">
              <h2>Choisissez votre abonnement</h2>
              <p className="subtitle">
                Accédez à tous les livres sans limite.
              </p>
            </div>

            <div className="plans">
              <div className="plan-card" onClick={handleSelectPlan}>
                <div className="plan-badge">Recommandé</div>

                <h3>Prime</h3>

                <div className="price">
                  <span className="amount">9,99€</span>
                  <span className="duration"> / 30 jours</span>
                </div>

                <ul className="features">
                  <li>✔ Accès illimité</li>
                  <li>✔ Lecture instantanée</li>
                  <li>✔ Support prioritaire</li>
                </ul>

                <button className="primary-btn">
                  Choisir ce plan
                </button>
              </div>
            </div>

            <button className="cancel-link" onClick={onClose}>
              Plus tard
            </button>
          </>
        )}

        {step === "payment" && (
          <>
            <h2>Paiement sécurisé</h2>

            <div className="payment-form">
              <input placeholder="Nom sur la carte" />
              <input placeholder="Numéro de carte" />
              <div className="row">
                <input placeholder="MM/YY" />
                <input placeholder="CVV" />
              </div>
            </div>

            {error && <div className="error">{error}</div>}

            <button
              className="primary-btn"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? "Activation..." : "Payer 9,99€"}
            </button>

            <button className="cancel-link" onClick={onClose}>
              Annuler
            </button>
          </>
        )}

        {step === "success" && (
          <>
            <h2>🎉 Abonnement activé !</h2>
            <p className="subtitle">
              Vous pouvez maintenant emprunter vos livres.
            </p>

            <button className="primary-btn" onClick={onClose}>
              Continuer
            </button>
          </>
        )}
      </div>
    </div>
  );
}