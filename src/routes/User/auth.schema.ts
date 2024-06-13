import { z } from "zod"
import { buildJsonSchemas } from "fastify-zod"

// data needed to register a user
const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  age: z.number(),
})

// exporting type to provide to the body 
export type CreateUserInput = z.infer<typeof userSchema>

// response schema for registering user
const userResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
})

// VV Same to Login VV

const loginSchema = z.object({
  email: z.string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    }).email(),
  password: z.string().min(6),
})

export type LoginUserInput = z.infer<typeof loginSchema>

const loginResponseSchema = z.object({
  accessToken: z.string()
})

export const {schemas: userSchemas, $ref} = buildJsonSchemas({
  userSchema,
  userResponseSchema,
  loginSchema,
  loginResponseSchema
})
