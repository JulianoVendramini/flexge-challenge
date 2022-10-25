import * as bcrypt from 'bcrypt'

export class CreateUser {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async create({ username, password }) {
    if (!username) {
      throw new Error('username is required')
    }

    if (!password) {
      throw new Error('Password is required')
    }

    const user = await this.userRepository.findByUsername(username)

    if (user) {
      throw new Error('Account already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = {
      username,
      password: passwordHash
    }

    await this.userRepository.create(newUser)

    return newUser
  }
}
