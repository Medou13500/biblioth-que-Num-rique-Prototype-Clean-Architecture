import axios from "axios"
import {
  BookRepository,
  Book,
  DashboardStats,
} from "../../domain/repositories/BookRepository"

const API_URL = "http://localhost:8000/api"

export class BookApiRepository implements BookRepository {

  private getHeaders() {
    const user = JSON.parse(localStorage.getItem("user") || "{}")

    return {
      "x-user-email": user.email,
    }
  }

  async getAll(): Promise<Book[]> {
    const response = await axios.get(`${API_URL}/books`, {
      headers: this.getHeaders(),
    })

    return response.data.data
  }

  async getById(id: string): Promise<Book> {
    const response = await axios.get(`${API_URL}/books/${id}`, {
      headers: this.getHeaders(),
    })

    return response.data.data
  }

  async create(title: string, author: string, status: string): Promise<void> {
    await axios.post(
      `${API_URL}/books`,
      { title, author, status },
      { headers: this.getHeaders() }
    )
  }

  async update(
    id: string,
    title: string,
    author: string,
    status: string
  ): Promise<void> {
    await axios.put(
      `${API_URL}/books/${id}`,
      { title, author, status },
      { headers: this.getHeaders() }
    )
  }

  async delete(id: string): Promise<void> {
    await axios.delete(`${API_URL}/books/${id}`, {
      headers: this.getHeaders(),
    })
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const books = await this.getAll()

    const total = books.length
    const available = books.filter(
      (b) => b.status === "disponible"
    ).length
    const unavailable = books.filter(
      (b) => b.status === "indisponible"
    ).length

    return { total, available, unavailable }
  }
}