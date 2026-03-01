import { useEffect, useMemo, useState } from "react"
import { Subscription } from "../../../domain/entities/Subscription"
import { SubscriptionApiRepository } from "../../../infrastructure/api/SubscriptionApiRepository"
import { CreateSubscriptionUseCase } from "../../../application/usecases/public/subscription/CreateSubscriptionUseCase"
import { GetMySubscriptionUseCase } from "../../../application/usecases/public/subscription/GetMySubscriptionUseCase"
import "./SubscriptionPage.css"

export function SubscriptionPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)

  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const repository = useMemo(() => new SubscriptionApiRepository(), [])
  const createUseCase = useMemo(
    () => new CreateSubscriptionUseCase(repository),
    [repository]
  )
  const getUseCase = useMemo(
    () => new GetMySubscriptionUseCase(repository),
    [repository]
  )

  useEffect(() => {
    const load = async () => {
      if (!user?.id) {
        setLoading(false)
        return
      }

      const result = await getUseCase.execute(user.id)
      setSubscription(result)
      setLoading(false)
    }

    load()
  }, [getUseCase, user?.id])

  const handleSubscribe = async () => {
    if (!user?.id) return

    const created = await createUseCase.execute(user.id)
    setSubscription(created)
  }

  if (loading) return <div>Chargement...</div>

  return (
    <div className="sub-page">
      <h1>Mon abonnement</h1>

      {subscription ? (
        <div>
          <p>Type : {subscription.type}</p>
          <p>Expire le : {subscription.end_date}</p>
        </div>
      ) : (
        <button onClick={handleSubscribe}>
          S’abonner (1 mois premium)
        </button>
      )}
    </div>
  )
}