import axios from 'axios'
import { getToken } from './localStorage'

const token = getToken()

export default axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: token ? `Bearer ${token}` : ''
  }
})
