import { userRoutes } from './routes/auth.routes';
import fastify from 'fastify'
import cookie from '@fastify/cookie'

export const app = fastify()

app.register(cookie)
app.register(userRoutes, {prefix: "user"})
