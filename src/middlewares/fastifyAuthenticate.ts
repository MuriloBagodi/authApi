import { FastifyReply, FastifyRequest } from "fastify"
import { env } from "../env"
import fp from "fastify-plugin"

module.exports = fp(async function(fastify: any, opts: any) {
  fastify.register(require("@fastify/jwt"), {
    secret: env.SECRET
  })

  fastify.decorate("authenticate", async function(request: FastifyRequest, reply:FastifyReply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
})