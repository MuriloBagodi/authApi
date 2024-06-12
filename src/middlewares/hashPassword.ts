import bcrypt from 'bcrypt'

export const hashingPassword = (pass: string) :string => {
  return bcrypt.hashSync(pass, 10)
}