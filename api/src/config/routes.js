import express from 'express'
import cors from 'cors'
import companyRouter from '../routes/company'
import authRouter from '../routes/auth'
import contractRouter from '../routes/contract'

export const setupRoutes = (app) => {
  app.use(
    express.urlencoded({
      extended: true
    })
  )
  app.use(cors())
  app.use(express.json())
  app.use('/auth', authRouter)
  app.use('/company', companyRouter)
  app.use('/contract', contractRouter)
}
