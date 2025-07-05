import * as React from 'react'
import { styled } from '@mui/material/styles'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Divider,
  Stack,
  useMediaQuery,
} from '@mui/material'
import logoNimbus from '../../assets/Nimbus.png'
import Tabs from '../../components/Tab'

const Form = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  width: '100%',
}))

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: '100%',
}))

const MyButton = styled(Button)(({ theme }) => ({
  minWidth: 180,
  height: 48,
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 16,
  marginBottom: 8,
  boxShadow: theme.shadows[1],
}))

const serviceTypeOptions = [
  { value: 'kt', label: 'Khám thường' },
  { value: 'kdv', label: 'Khám dịch vụ' },
]

const specialtyOptions = [
  { value: 'khoaTamThan', label: 'Khoa tâm thần' },
  { value: 'khoaTaiMuiHong', label: 'Khoa tai mũi họng' },
  { value: 'khoaMat', label: 'Khoa mắt' },
  { value: 'khoaRangHamMat', label: 'Khoa răng hàm mặt' },
]

export default function Appointment() {
  const [serviceType, setServiceType] = React.useState('')
  const [specialty, setSpecialty] = React.useState('')
  const [note, setNote] = React.useState('')
  const isMobile = useMediaQuery('(max-width:600px)')

  const selectedService = serviceTypeOptions.find(
    (option) => option.value === serviceType
  )
  const selectedSpecialty = specialtyOptions.find(
    (option) => option.value === specialty
  )

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: isMobile ? 1 : 4,
        background: '#f7fafd',
        minHeight: '100vh',
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h5" fontWeight={700} align="center" mb={2}>
                Đặt lịch khám bệnh
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Form>
                <Stack spacing={2}>
                  <StyledFormControl>
                    <InputLabel id="service-type-label">
                      1. Loại hình khám
                    </InputLabel>
                    <Select
                      value={serviceType}
                      labelId="service-type-label"
                      label="1. Loại hình khám"
                      onChange={(e) => setServiceType(e.target.value)}
                      variant="outlined"
                      fullWidth
                    >
                      {serviceTypeOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </StyledFormControl>
                  <StyledFormControl>
                    <InputLabel id="specialty-label">2. Chuyên khoa</InputLabel>
                    <Select
                      value={specialty}
                      labelId="specialty-label"
                      label="2. Chuyên khoa"
                      onChange={(e) => setSpecialty(e.target.value)}
                      variant="outlined"
                      fullWidth
                    >
                      {specialtyOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </StyledFormControl>
                  <StyledFormControl>
                    <InputLabel >3. Chọn theo nhu cầu</InputLabel>
                    <Box sx={{ mt: 5 }}>
                      <Tabs />
                    </Box>
                  </StyledFormControl>
                  <StyledFormControl>
                    <TextField
                      id="note-textField"
                      label="4. Nhập vấn đề"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </StyledFormControl>
                  <StyledFormControl>
                    <InputLabel>5. Phương thức thanh toán</InputLabel>
                    <Stack
                      direction={isMobile ? 'column' : 'row'}
                      spacing={2}
                      mt={6}
                    >
                      <MyButton
                        variant="outlined"
                        startIcon={
                          <img
                            src={logoNimbus}
                            alt="Logo"
                            style={{ height: 32 }}
                          />
                        }
                      >
                        MOMO
                      </MyButton>
                      <MyButton
                        variant="outlined"
                        startIcon={
                          <img
                            src={logoNimbus}
                            alt="Logo"
                            style={{ height: 32 }}
                          />
                        }
                      >
                        Thanh toán tại quầy
                      </MyButton>
                    </Stack>
                  </StyledFormControl>
                </Stack>
              </Form>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card sx={{ borderRadius: 4, boxShadow: 2, background: '#fff' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Thông tin đặt khám
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="subtitle1" fontWeight={500}>
                Bệnh viện Nimbus
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1">
                Loại hình khám: <b>{selectedService?.label || '-'}</b>
              </Typography>
              <Typography variant="body1">
                Chuyên khoa: <b>{selectedSpecialty?.label || '-'}</b>
              </Typography>
              <Typography variant="body1">
                Bác sĩ: <b>-</b>
              </Typography>
              <Typography variant="body1">
                Ngày giờ khám: <b>-</b>
              </Typography>
              <Typography variant="body1">
                Vấn đề: <b>{note || '-'}</b>
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 3,
                  width: '100%',
                  fontWeight: 600,
                  fontSize: 16,
                  borderRadius: 2,
                }}
              >
                Đặt lịch
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
