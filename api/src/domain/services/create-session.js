import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class CreateSession {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async auth({ username, password }) {
    if (!username) {
      throw new Error('username is required')
    }

    if (!password) {
      throw new Error('Password is required')
    }

    const user = await this.userRepository.findByUsername(username)

    if (!user) {
      throw new Error('Username or password is incorrect')
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      throw new Error('Username or password is incorrect')
    }

    const secret = process.env.SECRET
    const token = jwt.sign(
      {
        id: user.id
      },
      secret
    )

    const normalizedUser = {
      id: user.id,
      username: user.username
    }

    return {
      user: normalizedUser,
      token
    }
  }
}
