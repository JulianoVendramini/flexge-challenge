import axios from '../utils/axios'

const useApi = () => ({
  signIn: async (username: string, password: string) => {
    const response = await axios.post('/auth/login', {
      username,
      password
    })

    return response.data
  }
})

export default useApi
