import express from 'express'
const router = express.Router()

import { checkToken } from '../middleware/auth'
import { makeCreateContract, makeGetAllContracts } from '../factory/contract'

router.post('/', checkToken, async (req, res) => {
  const {
    country,
    state,
    city,
    documentNumber,
    socialReason,
    address,
    district,
    number,
    zipCode,
    email,
    phone,
    contractStartDate,
    contractEndDate,
    contractDueDate,
    company,
    products
  } = req.body

  const normalizedContract = {
    country,
    state,
    city,
    documentNumber,
    socialReason,
    address,
    district,
    number,
    zipCode,
    email,
    phone,
    contractStartDate,
    contractEndDate,
    contractDueDate,
    company,
    products
  }

  try {
    const newContract = await makeCreateContract().create(normalizedContract)
    res.status(201).send(newContract)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.get('/', checkToken, async (req, res) => {
  try {
    const contracts = await makeGetAllContracts().getAll()
    res.status(200).json(contracts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
