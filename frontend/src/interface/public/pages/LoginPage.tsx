import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik"
import * as Yup from "yup"

import { LoginUseCase } from "../../../application/usecases/LoginUseCase"
import { AuthApiRepository } from "../../../infrastructure/api/AuthApiRepository"
import { useAuth } from "../../../context/AuthContext"

import "./LoginPage.css"

interface LoginFormValues {
  email: string
  password: string
}

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth() // 🔥 ICI
  const [networkError, setNetworkError] = useState<string | null>(null)

  const validationSchema = Yup.object({
    email: Yup.string().email("Email invalide").required("Requis"),
    password: Yup.string().required("Requis"),
  })

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    setNetworkError(null)

    const authRepository = new AuthApiRepository()
    const loginUseCase = new LoginUseCase(authRepository)

    try {
      const user = await loginUseCase.execute(
        values.email,
        values.password
      )

      // 🔥 ON PASSE PAR LE CONTEXTE
      login(user, "fake-token") 

      navigate("/catalogue")

    } catch (error: unknown) {
      if (error instanceof Error) {
        setNetworkError(error.message)
      } else {
        setNetworkError("Erreur inconnue")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Connexion</h2>

        {networkError && (
          <div className="network-error">
            {networkError}
          </div>
        )}

        <Formik<LoginFormValues>
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
                {isSubmitting ? "Connexion..." : "Se connecter"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}