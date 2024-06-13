import bcrypt from 'bcrypt'
import { FastifyReply } from 'fastify'
import { app } from '../app'

export const comparePassword = async (userPass: string, hashedPass: string, res: FastifyReply, user: object) => {
  const isAuthenticated = bcrypt.compareSync(userPass, hashedPass)

  if (!isAuthenticated) {
    return res.status(401).send({ messageError: "Not Authorized" })
  }
  const token = app.jwt.sign(user)

  return token
}