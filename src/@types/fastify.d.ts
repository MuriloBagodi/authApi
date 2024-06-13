import { JWT } from '@fastify/jwt'
import 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    user: {
      id: string
      name: string
      email: string
      password: string
      age: number
      created_at: string
      updated_at: string
    }
    jwt: JWT
  }
  export interface FastifyInstance {
    authenticate: any
  }
}

type UserPayload = {
  id: string,
  email: string,
  name: string
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    user: UserPayload
  }
}
