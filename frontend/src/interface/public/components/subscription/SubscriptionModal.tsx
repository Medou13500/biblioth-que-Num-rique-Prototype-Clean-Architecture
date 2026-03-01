import { useMemo, useState } from "react"
import "./SubscriptionModal.css"
import { SubscriptionApiRepository } from "../../../../infrastructure/api/SubscriptionApiRepository"
import { CreateSubscriptionUseCase } from "../../../../application/usecases/public/subscription/CreateSubscriptionUseCase"
import { Subscription } from "../../../../domain/entities/Subscription"

interface Props {
  open: boolean
  onClose: () => void
  onSubscribed: (sub: Subscription) => void
}

type Plan = "premium"

export function SubscriptionModal({ open, onClose, onSubscribed }: Props) {
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const repository = useMemo(() => new SubscriptionApiRepository(), [])
  const createUseCase = useMemo(() => new CreateSubscriptionUseCase(repository), [repository])

  if (!open) return null

  const subscribe = async (plan: Plan) => {
    setErrorMsg(null)
    setLoading(true)
    try {
      const sub = await createUseCase.execute(plan)
      onSubscribed(sub)
      onClose()
    } catch (e) {
      const message = e instanceof Error ? e.message : "Erreur abonnement"
      setErrorMsg(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="sub-modal-overlay" onClick={onClose}>
      <div className="sub-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sub-modal-head">
          <h3>Activer un abonnement</h3>
          <button className="sub-close" onClick={onClose} aria-label="Fermer">✕</button>
        </div>

        <p className="sub-desc">
          Pour emprunter un livre, tu dois avoir un abonnement actif.
        </p>

        {errorMsg && <div className="sub-error">{errorMsg}</div>}

        <div className="sub-actions">
          <button className="sub-primary" onClick={() => subscribe("premium")} disabled={loading}>
            {loading ? "Activation..." : "Activer Premium (30 jours)"}
          </button>
          <button className="sub-secondary" onClick={onClose} disabled={loading}>
            Plus tard
          </button>
        </div>
      </div>
    </div>
  )
}