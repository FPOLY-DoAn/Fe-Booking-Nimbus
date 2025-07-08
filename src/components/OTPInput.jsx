import { useState, useRef, useEffect } from 'react'
import { Box, TextField, Typography, Button } from '@mui/material'
import styled from '@emotion/styled'

const StyledTextField = styled(TextField)`
  width: 50px;
  margin: 0 8px;

  input {
    text-align: center;
    font-size: 24px;
    padding: 8px 0;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`

const OTPInput = ({ length = 6, onComplete, otpTimeout = 60 }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''))
  const inputRefs = useRef([])
  const [counter, setCounter] = useState(otpTimeout) // giây
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    // Focus vào ô đầu tiên khi component mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
    setCounter(otpTimeout)
    setCanResend(false)
  }, [otpTimeout])

  useEffect(() => {
    if (counter <= 0) {
      setCanResend(true)
      return
    }
    const timer = setInterval(() => {
      setCounter((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [counter])

  const handleChange = (index, e) => {
    const value = e.target.value
    if (isNaN(value)) return // Chỉ cho phép nhập số

    const newOtp = [...otp]
    // Chỉ lấy ký tự cuối cùng nếu paste nhiều số
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    // Nếu có giá trị và không phải ô cuối, focus vào ô tiếp theo
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus()
    }

    // Kiểm tra nếu đã điền đủ OTP
    const otpValue = newOtp.join('')
    if (otpValue.length === length) {
      onComplete?.(otpValue)
    }
  }

  const handleKeyDown = (index, e) => {
    // Xử lý khi nhấn Backspace
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Nếu ô hiện tại trống và không phải ô đầu, focus về ô trước
        const newOtp = [...otp]
        newOtp[index - 1] = ''
        setOtp(newOtp)
        inputRefs.current[index - 1].focus()
      }
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData('text').slice(0, length)
    if (!/^\d+$/.test(pasteData)) return // Chỉ cho phép paste số

    const newOtp = [...otp]
    pasteData.split('').forEach((char, index) => {
      if (index < length) {
        newOtp[index] = char
      }
    })
    setOtp(newOtp)

    // Focus vào ô cuối cùng được paste
    const focusIndex = Math.min(pasteData.length, length - 1)
    inputRefs.current[focusIndex].focus()

    if (pasteData.length === length) {
      onComplete?.(pasteData)
    }
  }

  const handleVerify = () => {
    const otpValue = otp.join('')
    if (otpValue.length === length) {
      onComplete?.(otpValue)
    } else {
      alert('Vui lòng nhập đủ mã OTP')
    }
  }

  // Cho phép gửi lại bất cứ lúc nào
  const handleResend = () => {
    setOtp(new Array(length).fill(''))
    setCounter(otpTimeout)
    setCanResend(false)
    if (inputRefs.current[0]) inputRefs.current[0].focus()
    // TODO: Gọi API gửi lại OTP ở đây nếu cần
  }

  return (
    <Box sx={{ textAlign: 'center', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Nhập mã OTP
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Vui lòng nhập mã OTP đã được gửi đến email của bạn
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        {otp.map((digit, index) => (
          <StyledTextField
            key={index}
            inputRef={(ref) => (inputRefs.current[index] = ref)}
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            type="number"
            variant="outlined"
            inputProps={{
              maxLength: 1,
              style: { textAlign: 'center' },
            }}
            disabled={canResend}
          />
        ))}
      </Box>

      <Typography color={canResend ? 'error' : 'primary'} sx={{ mb: 2 }}>
        {canResend
          ? 'Mã OTP đã hết hạn. Vui lòng gửi lại mã.'
          : `Mã OTP sẽ hết hạn sau: ${Math.floor(counter / 60)}:${('0' + (counter % 60)).slice(-2)}`}
      </Typography>

      <Button
        variant="contained"
        onClick={handleVerify}
        fullWidth
        sx={{ mt: 2 }}
        disabled={canResend}
      >
        Xác nhận
      </Button>

      <Typography sx={{ mt: 2 }}>
        Không nhận được mã?{' '}
        <Button
          color="primary"
          // Cho phép gửi lại bất cứ lúc nào
          disabled={false}
          onClick={handleResend}
        >
          Gửi lại
        </Button>
      </Typography>
    </Box>
  )
}

export default OTPInput
