import 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    user: {
      id: string
      session_id: string
      name: string
      email: string
      password: string
      age: number
      created_at: string
      updated_at: string
    }
  }
}