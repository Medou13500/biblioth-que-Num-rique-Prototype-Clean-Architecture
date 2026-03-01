import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik"
import * as Yup from "yup"

import { RegisterUseCase } from "../../../application/usecases/RegisterUseCase"
import { AuthApiRepository } from "../../../infrastructure/api/AuthApiRepository"

import "./RegisterPage.css"

interface RegisterFormValues {
  email: string
  password: string
}

type PopupType = "success" | "error" | null

export function RegisterPage() {
  const navigate = useNavigate()
  const [popup, setPopup] = useState<PopupType>(null)
  const [popupMessage, setPopupMessage] = useState("")

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email invalide")
      .required("Email requis"),
    password: Yup.string()
      .min(6, "Minimum 6 caractères")
      .required("Mot de passe requis"),
  })

  const handleSubmit = async (
    values: RegisterFormValues,
    { setSubmitting }: FormikHelpers<RegisterFormValues>
  ) => {
    const repository = new AuthApiRepository()
    const registerUseCase = new RegisterUseCase(repository)

    try {
      const user = await registerUseCase.execute(
        values.email,
        values.password
      )

      localStorage.setItem("user", JSON.stringify(user))

      setPopup("success")
      setPopupMessage("Inscription réussie 🎉")

      setTimeout(() => {
        navigate("/catalogue")
      }, 1500)

    } catch (error: unknown) {
      setPopup("error")

      if (error instanceof Error) {
        setPopupMessage(error.message)
      } else {
        setPopupMessage("Erreur lors de l'inscription")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Inscription</h2>
        <p className="auth-subtitle">
          Créez votre compte pour accéder à la bibliothèque
        </p>

        <Formik<RegisterFormValues>
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="auth-form">
              <div className="form-group">
                <label>Email</label>
                <Field type="email" name="email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-group">
                <label>Mot de passe</label>
                <Field type="password" name="password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>

              <button
                type="submit"
                className="auth-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Inscription..." : "S'inscrire"}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {popup && (
        <div className="popup-overlay">
          <div className={`popup ${popup}`}>
            <h3>
              {popup === "success"
                ? "Succès"
                : "Erreur"}
            </h3>
            <p>{popupMessage}</p>
          </div>
        </div>
      )}
    </div>
  )
}