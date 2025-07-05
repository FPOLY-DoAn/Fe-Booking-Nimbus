import axios from 'axios'

const BASE_URL = 'http://localhost:2615'

// Xác thực OTP từ email
const ConfirmOTPService = async (otp) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/confirm_OTP?otp=${otp}`)
    return response.data
  } catch (error) {
    throw error.response?.data 
  }
}

export default ConfirmOTPService
