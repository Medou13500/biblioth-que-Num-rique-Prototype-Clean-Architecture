import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik"
import * as Yup from "yup"

import { useAuth } from "../../../context/AuthContext"
import { AdminLoginUseCase } from "../../../application/usecases/admin/AdminLoginUseCase"
import { AuthApiRepository } from "../../../infrastructure/api/AuthApiRepository"

import "./AdminLoginPage.css"

interface LoginFormValues {
  email: string
  password: string
}

export function AdminLoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [networkError, setNetworkError] = useState(false)

  const validationSchema = Yup.object({
    email: Yup.string().email("Email invalide").required("Requis"),
    password: Yup.string().required("Requis"),
  })

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    setNetworkError(false)

    const authRepository = new AuthApiRepository()
    const loginUseCase = new AdminLoginUseCase(authRepository)

    try {
      const user = await loginUseCase.execute(
        values.email,
        values.password
      )

      login({
        email: user.email,
        role: "ADMIN"
      })

      navigate("/admin/dashboard")
    } catch (error: unknown) {
      setNetworkError(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Connexion Administrateur</h2>

        {networkError && (
          <div className="network-error">
            Identifiants invalides ou accès refusé.
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
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="form-group">
                <label>Mot de passe</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" className="error" />
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