import axios from 'axios'

const BASE_URL = 'http://localhost:2615'

export const loginService = {
  login: async (email, matKhau) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        matKhau,
      })
      console.log('Login response:', response.data)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },
}

export default loginService
