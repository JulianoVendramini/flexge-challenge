import * as dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { Company } from './infra/db/models/Company'
import { Contract } from './infra/db/models/Contract'
import { User } from './infra/db/models/User'
import * as bcrypt from 'bcrypt'

dotenv.config()

const app = express()

const dbUserName = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD

mongoose
  .connect(
    `mongodb+srv://${dbUserName}:${dbPassword}@apicluster.wgvhecl.mongodb.net/flexge-challenge?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Connected to database seed!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))

const seedCompanies = [
  {
    name: 'Flexge'
  },
  {
    name: 'Divisio'
  },
  {
    name: 'Banco do Brasil'
  },
  {
    name: 'Banco Inter'
  },
  {
    name: 'Havan'
  },
  {
    name: 'Magazine Luiza'
  },
  {
    name: 'Boticário'
  },
  {
    name: 'C&A'
  },
  {
    name: 'Renner'
  },
  {
    name: 'Lojas Americanas'
  }
]

const salt = await bcrypt.genSalt(10)
const passwordHash = await bcrypt.hash('admin', salt)

const seedUser = {
  username: 'admin',
  password: passwordHash
}

const seedDB = async () => {
  await Contract.deleteMany({})
  await Company.deleteMany({})
  await Company.insertMany(seedCompanies)
  await User.deleteMany({})
  //add user
  await User.insertMany(seedUser)

  console.log('DB seeded!')
}

seedDB().then(() => {
  mongoose.connection.close()
})
