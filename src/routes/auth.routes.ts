import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import bcrypt from 'bcrypt'
import { hashingPassword } from '../middlewares/hashPassword'

export const userRoutes = async (app: FastifyInstance) => {
  // This route should create a user
  app.post('/', async (req, res) => {
    const userSchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
      age: z.number(),
    })

    // Session id need to be used when the user loged in 
    // let sessionId = req.cookies.sessionId
    // if (!sessionId) {
    //   sessionId = randomUUID()
    //   res.setCookie('sessionId', sessionId, {
    //     path: '/',
    //     maxAge: 1000 * 60 * 60, // 1h
    //   })
    // }

    const { name, email, password, age } = userSchema.parse(req.body)

    const hashPassword: string = hashingPassword(password)

    await knex('users').insert({
      id: randomUUID(),
      name,
      email,
      password: hashPassword,
      age
    }).then(() => { res.status(201).send({ message: "user created with success" }) })
  })
}
