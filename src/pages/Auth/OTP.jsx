import OTPInput from '../../components/OTPInput'
import CardCostome from '../../components/Card'
import { Box } from '@mui/material'

const OTP = () => {
  const handleOTPComplete = (otp) => {
    console.log('OTP entered:', otp)
    // Xử lý mã OTP ở đây
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
    </Box>
  )
}

export default OTP
