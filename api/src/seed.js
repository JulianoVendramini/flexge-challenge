import * as dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { Product } from './infra/db/models/Product'

dotenv.config()

const app = express()

const dbUserName = process.env.DB_USERNAME
const dbPassword = process.env.DB_PASSWORD

mongoose
  .connect(
    `mongodb+srv://${dbUserName}:${dbPassword}@apicluster.wgvhecl.mongodb.net/flexge-challenge?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('Connected to database!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))

const seedProducts = [
  {
    name: 'Licenças por pacote',
    amount: 100,
    finalUnityPrice: 28,
    installments: 0,
    paidInstallments: 0,
    begginingTerm: new Date('2021-01-01')
  },
  {
    name: 'Licenças por pacote',
    amount: 200,
    finalUnityPrice: 25,
    installments: 0,
    paidInstallments: 0,
    begginingTerm: new Date('2021-01-01')
  },
  {
    name: 'Licenças por pacote',
    amount: 300,
    finalUnityPrice: 22,
    installments: 0,
    paidInstallments: 0,
    begginingTerm: new Date('2021-01-01')
  }
]

const seedDB = async () => {
  await Product.deleteMany({})
  await Product.insertMany(seedProducts)
}

seedDB().then(() => {
  mongoose.connection.close()
})
