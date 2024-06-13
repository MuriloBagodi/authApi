import { userRoutes } from './routes/User/auth.routes';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import cookie from '@fastify/cookie'
import jwt, { FastifyJWT } from '@fastify/jwt';
import { env } from './env';

export const app = Fastify()

app.register(jwt, { secret: env.SECRET })
app.addHook("preHandler", (req, res, next) => {
  req.jwt = app.jwt
  return next()
})
app.decorate('authenticate', async (req: FastifyRequest, res: FastifyReply) => {
  const token = req.cookies.access_token

  if (!token) {
    return res.status(401).send({ message: "Authentication Required" })
  }
  const decoded = req.jwt.verify<FastifyJWT['user']>(token)
  req.user = decoded
})
app.register(cookie, { secret: env.COOKIE_SECRET, hook: 'preHandler' })
app.register(userRoutes, { prefix: "user" })
