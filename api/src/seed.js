import * as dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { Company } from './infra/db/models/Company'

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

const seedDB = async () => {
  await Company.deleteMany({})
  await Company.insertMany(seedCompanies)
  console.log('DB seeded!')
}

seedDB().then(() => {
  mongoose.connection.close()
})
