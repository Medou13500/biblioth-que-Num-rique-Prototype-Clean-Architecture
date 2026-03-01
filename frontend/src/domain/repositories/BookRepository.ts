export interface Book {
  id: string
  title: string
  author: string
  status: string
}

export interface DashboardStats {
  total: number
  available: number
  unavailable: number
}

export interface BookRepository {
  getAll(): Promise<Book[]>
  getById(id: string): Promise<Book>
  create(title: string, author: string, status: string): Promise<void>
  update(id: string, title: string, author: string, status: string): Promise<void>
  delete(id: string): Promise<void>
  getDashboardStats(): Promise<DashboardStats>
}