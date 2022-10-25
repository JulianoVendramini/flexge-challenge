import * as dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import { setupRoutes } from './config/routes'
dotenv.config()

const app = express()
setupRoutes(app)

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
