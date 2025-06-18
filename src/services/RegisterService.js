import axios from 'axios'

const BASE_URL = 'http://localhost:2615'

export const registerService = {
  login: async (hoTen, gioiTinh, email, matKhau, sdt) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, {
        hoTen,
        gioiTinh,
        email,
        matKhau,
        sdt,
      })
      console.log('register response:', response.data)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  },
}

export default registerService
