import axios from 'axios'

const BASE_URL = 'http://localhost:2615'

const RegisterService = async ( hoTen,
      email,
      matKhau,
      soDienThoai,
      gioiTinh,) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      hoTen,
      email,
      matKhau,
      soDienThoai,
      gioiTinh,
      
    })
    return response.data
  } catch (error) {
    console.error('Registration error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    })
    throw error.response?.data || error.message
  }
}

export default RegisterService
