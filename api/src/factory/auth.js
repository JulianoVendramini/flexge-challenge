import { CreateUser, CreateSession } from '../domain/services'
import { UserRepository } from '../infra/repositories'

export const makeCreateAccount = () => {
  const userRepository = new UserRepository()
  const createAccountService = new CreateUser(userRepository)

  return createAccountService
}

export const makeAuthAccount = () => {
  const userRepository = new UserRepository()
  const authAccountService = new CreateSession(userRepository)

  return authAccountService
}
