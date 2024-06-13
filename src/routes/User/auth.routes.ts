import { FastifyInstance } from 'fastify'
import { $ref } from './auth.schema'
import { createUser, getUsers, login, logout } from './auth.controller'

export const userRoutes = async (app: FastifyInstance) => {
  // This route should create a user
  app.post('/', {
    schema: {
      body: $ref("userSchema"), response: {
        201: $ref("userResponseSchema")
      },
    },
  }, createUser)

  // Find All Users
  app.get("/", { preHandler: [app.authenticate] }, getUsers)

  //Login route

  app.post('/login', {
    schema: {
      body: $ref("loginSchema"),
      response: {
        201: $ref("loginResponseSchema")
      }
    }
  }, login)

  app.delete("/logout", {preHandler: [app.authenticate]} ,logout)

  app.log.info("User Routes Registred")


}
