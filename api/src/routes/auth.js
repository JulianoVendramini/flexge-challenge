import express from 'express'
const router = express.Router()

import { makeCreateAccount, makeAuthAccount } from '../factory/auth'

router.post('/register', async (req, res) => {
  const { username, password } = req.body

  try {
    const newUser = await makeCreateAccount().create({ username, password })
    res.status(201).send(newUser)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const response = await makeAuthAccount().auth({ username, password })
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
