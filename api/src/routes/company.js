import express from 'express'
const router = express.Router()

import { checkToken } from '../middleware/auth'
import { makeCreateCompany, makeGetAllCompanies } from '../factory/company'

router.post('/', checkToken, async (req, res) => {
  const { name } = req.body

  try {
    const newCompany = await makeCreateCompany().create({ name })
    res.status(201).send(newCompany)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.get('/', checkToken, async (req, res) => {
  try {
    const companies = await makeGetAllCompanies().getAll()
    res.status(200).json(companies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
