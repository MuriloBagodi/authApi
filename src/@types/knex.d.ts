import 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      email: string
      password: string
      age: number
      created_at: string
      updated_at: string
    }
  }
}
