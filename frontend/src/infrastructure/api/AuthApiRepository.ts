import axios, { AxiosError } from "axios"
import { AuthRepository } from "../../domain/repositories/AuthRepository"
import { User } from "../../domain/entities/User"

const API_BASE_URL = "http://127.0.0.1:8000/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

interface ApiResponse<T> {
  status: string
  data: T
}

export class AuthApiRepository implements AuthRepository {

  async login(email: string, password: string): Promise<User> {
    try {
      const response = await api.post<ApiResponse<User>>("/login", {
        email,
        password,
      })

      return response.data.data
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>
      throw new Error(
        err.response?.data?.message || "Identifiants invalides"
      )
    }
  }

  async register(email: string, password: string): Promise<User> {
    try {
      const response = await api.post<ApiResponse<User>>("/register", {
        email,
        password,
      })

      return response.data.data
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>
      throw new Error(
        err.response?.data?.message || "Erreur inscription"
      )
    }
  }

  async loginAdmin(email: string, password: string): Promise<User> {
    try {
      const response = await api.post<ApiResponse<User>>("/admin/login", {
        email,
        password,
      })

      return response.data.data
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>
      throw new Error(
        err.response?.data?.message || "Accès admin refusé"
      )
    }
  }
}