import { validate } from "email-validator"

export const validateEmail = (email: string) =>{
  const isValidEmail = validate(email)
  console.log(isValidEmail)
  if(isValidEmail){
    return email
  }
  throw new Error("Email is not Valid")
}