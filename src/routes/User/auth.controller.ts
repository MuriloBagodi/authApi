import { CreateUserInput, LoginUserInput } from './auth.schema';
import { FastifyReply, FastifyRequest } from 'fastify'
import bcrypt from 'bcrypt'
import { knex } from '../../database';
import { env } from '../../env';
import { randomUUID } from 'crypto';
import { validateEmail } from '../../middlewares/validateEmail';


export async function createUser(req: FastifyRequest<{ Body: CreateUserInput }>, res: FastifyReply) {
  const { password, email, name, age } = req.body

  const user = await knex("users").where({ email }).first()
  if (user) {
    return res.status(401).send({ message: "User Already exist with this email" })
  }

  try {
    const hash = bcrypt.hashSync(password, env.SALT_ROUNDS)
    await knex('users').insert({
      id: randomUUID(),
      name,
      email,
      password: hash,
      age
    }).then(async() => {
      await knex('users').where({
        email
      }).first().then((e)=>{
        console.log(e)
        return res.status(201).send(e)
      })
    })
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }
}

export async function getUsers(req: FastifyRequest,res: FastifyReply) {
  const users = await knex('users').select("*")
  console.log(users)

  return res.status(201).send({users})
}

export async function login(req: FastifyRequest<{Body: LoginUserInput}>, res: FastifyReply) {
  const {email, password} = req.body

  validateEmail(email)

  const user = await knex("users").where({email}).first()

  const isMatchedPassword = user && (bcrypt.compareSync(password, user.password))

  if(!isMatchedPassword || !user){
    return res.status(401).send({message: "invalid password or email"})
  }

  const payload = {
    id: user.id,
    email,
    name: user.name
  }

  const token = req.jwt.sign(payload)

  res.setCookie("access_token", token, {
    path: "/",
    httpOnly: true,
    secure: true
  })

  return {
    accessToken: token
  }


}

export async function logout(req: FastifyRequest,res: FastifyReply) {
  res.clearCookie('access_token')
  return res.send({message: "Logout successful"})
}