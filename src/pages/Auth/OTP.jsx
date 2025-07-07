import OTPInput from '../../components/OTPInput'
import CardCostome from '../../components/Card'
import { Box } from '@mui/material'
import ConfirmOTPService from '../../services/ConfirmOTPService'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { MuiAlertCustom } from '../../components'

const OTP = () => {
  const navigate = useNavigate()
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  // useEffect(() => {
    // Kiểm tra trạng thái xác nhận đăng ký
  //   const isPendingOTP = localStorage.getItem('pendingOTP')
  //   const alerted = sessionStorage.getItem('alertedOTP')
  //   if (!isPendingOTP && !alerted) {
  //     window.alert(
  //       'Bạn cần đăng ký tài khoản trước khi xác thực OTP. Vui lòng đăng ký tài khoản.'
  //     )
  //     sessionStorage.setItem('alertedOTP', 'true')
  //     // Nếu không có flag, chuyển hướng về trang đăng ký
  //     navigate('/register')
  //   }
  // }, [navigate])

  // useEffect(() => {
  //   // Xóa flag khi vào lại trang OTP đúng quy trình
  //   if (localStorage.getItem('pendingOTP')) {
  //     sessionStorage.removeItem('alertedOTP')
  //   }
  // }, [])

  const handleOTPComplete = async (otp) => {
    try {
      const result = await ConfirmOTPService(otp)
      setAlert({
        open: true,
        message: result.message,
        severity: 'success',
      })
      setTimeout(() => {
        navigate('/Login')
      }, 1200)
    } catch (error) {
      // Log chi tiết lỗi trả về từ server
      console.error('OTP xác thực lỗi:', error, error.response?.data)
      setAlert({
        open: true,
        message: error.message,
        severity: 'error',
      })
    }
  }
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CardCostome variant="outlined">
        <OTPInput length={6} onComplete={handleOTPComplete} />
      </CardCostome>
      <MuiAlertCustom
        open={alert.open}
        onClose={() => setAlert({ ...alert, open: false })}
        severity={alert.severity}
        message={alert.message}
      />
    </Box>
  )
}

export default OTP
