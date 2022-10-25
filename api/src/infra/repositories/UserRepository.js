import { User } from '../db/models/User'

export class UserRepository {
  async create(user) {
    const newUser = await User.create(user)

    return newUser
  }

  async findByUsername(username) {
    //remove password from response
    const user = await User.findOne({ username })

    return user
  }

  async findById(id) {
    const user = await User.findById(id)

    return user
  }
}
