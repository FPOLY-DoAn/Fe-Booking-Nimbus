import axios from 'axios'

const BASE_URL = 'http://localhost:2615'

const LoginService = async (email, matKhau) => {
  try{
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      matKhau,
    })
    console.log(response.data)
    return response.data
  }catch(error){
    throw error.response?.data || error.message
  }
}

export default LoginService
