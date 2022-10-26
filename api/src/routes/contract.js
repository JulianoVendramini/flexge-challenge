import express from 'express'
const router = express.Router()

import { checkToken } from '../middleware/auth'
import {
  makeCreateContract,
  makeGetAllContracts,
  makeGetContract,
  makeUpdateContract
} from '../factory/contract'

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
  const page = req.query.page || 1
  const contractsPer = 5

  try {
    const contracts = await makeGetAllContracts().getAll(page, contractsPer)
    res.status(200).json(contracts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:socialReason', checkToken, async (req, res) => {
  const { socialReason } = req.params

  try {
    const contract = await makeGetContract().get(socialReason)
    res.status(200).json(contract)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/:socialReason', checkToken, async (req, res) => {
  const { socialReason: prevSocialReason } = req.params

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
    contractDueDate
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
    contractDueDate
  }

  try {
    const updatedContract = await makeUpdateContract().update(
      prevSocialReason,
      normalizedContract
    )
    res.status(200).send(updatedContract)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

export default router
