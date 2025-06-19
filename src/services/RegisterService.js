import axios from 'axios'
// import { API_URL } from '../utils/setting'
const BASE_URL = 'http://localhost:2615'
const register = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, userData)
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export { register }
