import { app } from './app'
import { env } from './env'
import { userSchemas } from './routes/User/auth.schema'

const port = env.PORT || 3333

app
  .listen({ port })
  .then(() => console.log('Server Running on port', port))
  .catch((err) => console.log({ ErrorMessage: err }))

const listeners = ['SIGINT', 'SIGTERM']
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await app.close()
    process.exit(0)
  })
})

for (let schema of [...userSchemas]) {
  app.addSchema(schema)
}
