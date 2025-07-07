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
  Tabs,
  Tab,
} from '@mui/material'
import logoNimbus from '../../assets/Nimbus.png'
import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

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
  { value: 'trong_gio', label: 'Khám trong giờ' },
  { value: 'ngoai_gio', label: 'Khám ngoài giờ' },
]

const specialtyOptions = [
  { value: 'khoaTamThan', label: 'Khoa tâm thần' },
  { value: 'khoaTaiMuiHong', label: 'Khoa tai mũi họng' },
  { value: 'khoaMat', label: 'Khoa mắt' },
  { value: 'khoaRangHamMat', label: 'Khoa răng hàm mặt' },
]

const doctorOptions = [
  { value: 'DrA', label: 'Bác sĩ A' },
  { value: 'DrB', label: 'Bác sĩ B' },
  { value: 'DrC', label: 'Bác sĩ C' },
]

const timeOptions = [
  { value: '07:00-08:00', label: '07:00 - 08:00' },
  { value: '08:00-09:00', label: '08:00 - 09:00' },
  { value: '09:00-10:00', label: '09:00 - 10:00' },
  { value: '10:00-11:00', label: '10:00 - 11:00' },
  { value: '13:00-14:00', label: '13:00 - 14:00' },
  { value: '14:00-15:00', label: '14:00 - 15:00' },
  { value: '15:00-16:00', label: '15:00 - 16:00' },
]

const paymentMethods = [
  { value: 'momo', label: 'MOMO' },
  { value: 'counter', label: 'Thanh toán tại quầy' },
]

export default function Appointment() {
  const [formData, setFormData] = useState({
    serviceType: '',
    specialty: '',
    doctor: '',
    date: '',
    time: '',
    note: '',
    payment: '',
  })
  const [tab, setTab] = useState(0) // 0: theo bác sĩ, 1: theo ngày
  const [openTimeModal, setOpenTimeModal] = useState(false)
  const isMobile = useMediaQuery('(max-width:600px)')

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleTabChange = (event, newValue) => {
    setTab(newValue)
    setFormData((prev) => ({ ...prev, doctor: '', date: '', time: '' }))
  }

  const handleSelectPayment = (value) => {
    setFormData((prev) => ({ ...prev, payment: value }))
  }

  const handleSelectTime = (value) => {
    setFormData((prev) => ({ ...prev, time: value }))
    setOpenTimeModal(false)
  }

  // Format date yyyy-mm-dd thành dd/mm/yyyy
  const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    const [y, m, d] = dateStr.split('-')
    return `${d}/${m}/${y}`
  }

  const selectedService = serviceTypeOptions.find(
    (option) => option.value === formData.serviceType
  )
  const selectedSpecialty = specialtyOptions.find(
    (option) => option.value === formData.specialty
  )
  const selectedDoctor = doctorOptions.find(
    (option) => option.value === formData.doctor
  )
  const selectedPayment = paymentMethods.find(
    (option) => option.value === formData.payment
  )
  const selectedTime = timeOptions.find(
    (option) => option.value === formData.time
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    //  Call API đặt lịch 
  }

  function renderMenuOptions(
    options,
    hasEmpty = false,
    emptyLabel = 'Không chọn'
  ) {
    const items = options.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))
    if (hasEmpty) {
      items.unshift(
        <MenuItem key="empty" value="">
          {emptyLabel}
        </MenuItem>
      )
    }
    return items
  }

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
                Đăng ký khám bệnh
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <StyledFormControl>
                    <InputLabel id="service-type-label">
                      1. Loại dịch vụ khám
                    </InputLabel>
                    <Select
                      value={formData.serviceType}
                      labelId="service-type-label"
                      label="1. Loại dịch vụ khám"
                      onChange={handleChange('serviceType')}
                      variant="outlined"
                      fullWidth
                      required
                    >
                      {renderMenuOptions(serviceTypeOptions)}
                    </Select>
                  </StyledFormControl>
                  <StyledFormControl>
                    <InputLabel id="specialty-label">2. Chuyên khoa</InputLabel>
                    <Select
                      value={formData.specialty}
                      labelId="specialty-label"
                      label="2. Chuyên khoa"
                      onChange={handleChange('specialty')}
                      variant="outlined"
                      fullWidth
                      required
                    >
                      {renderMenuOptions(specialtyOptions)}
                    </Select>
                  </StyledFormControl>
                  <StyledFormControl>
                    <InputLabel>3. Chọn theo nhu cầu</InputLabel>
                    <Box sx={{ mt: 5 }}>
                      <Tabs
                        value={tab}
                        onChange={handleTabChange}
                        centered
                        aria-label="tabs chọn nhu cầu"
                        sx={{ mb: 2 }}
                      >
                        <Tab label="Theo bác sĩ" />
                        <Tab label="Theo ngày" />
                      </Tabs>
                      {tab === 0 ? (
                        <Stack spacing={2}>
                          <FormControl fullWidth required>
                            <InputLabel id="doctor-label">Bác sĩ</InputLabel>
                            <Select
                              value={formData.doctor}
                              labelId="doctor-label"
                              label="Bác sĩ"
                              onChange={handleChange('doctor')}
                              variant="outlined"
                              fullWidth
                              required
                            >
                              {renderMenuOptions(doctorOptions)}
                            </Select>
                          </FormControl>
                          <FormControl fullWidth required>
                            <TextField
                              label="Chọn ngày khám"
                              type="date"
                              value={formData.date}
                              onChange={handleChange('date')}
                              InputLabelProps={{ shrink: true }}
                              fullWidth
                              required
                            />
                          </FormControl>
                          <FormControl fullWidth required>
                            <Button
                              variant="outlined"
                              onClick={() => setOpenTimeModal(true)}
                              sx={{
                                height: 48,
                                borderRadius: 2,
                                fontWeight: 600,
                              }}
                            >
                              {formData.time
                                ? `Khung giờ: ${selectedTime?.label}`
                                : 'Chọn khung giờ'}
                            </Button>
                          </FormControl>
                        </Stack>
                      ) : (
                        <Stack spacing={2}>
                          <FormControl fullWidth required>
                            <TextField
                              label="Chọn ngày khám"
                              type="date"
                              value={formData.date}
                              onChange={handleChange('date')}
                              InputLabelProps={{ shrink: true }}
                              fullWidth
                              required
                            />
                          </FormControl>
                          <FormControl fullWidth>
                            <InputLabel id="doctor-label">
                              Bác sĩ (không bắt buộc)
                            </InputLabel>
                            <Select
                              value={formData.doctor}
                              labelId="doctor-label"
                              label="Bác sĩ (không bắt buộc)"
                              onChange={handleChange('doctor')}
                              variant="outlined"
                              fullWidth
                            >
                              {renderMenuOptions(doctorOptions, true)}
                            </Select>
                          </FormControl>
                          <FormControl fullWidth required>
                            <Button
                              variant="outlined"
                              onClick={() => setOpenTimeModal(true)}
                              sx={{
                                height: 48,
                                borderRadius: 2,
                                fontWeight: 600,
                              }}
                            >
                              {formData.time
                                ? `Khung giờ: ${selectedTime?.label}`
                                : 'Chọn khung giờ'}
                            </Button>
                          </FormControl>
                        </Stack>
                      )}
                    </Box>
                  </StyledFormControl>
                  <StyledFormControl>
                    <TextField
                      id="note-textField"
                      label="4. Nhập vấn đề sức khỏe cần khám"
                      variant="outlined"
                      fullWidth
                      value={formData.note}
                      onChange={handleChange('note')}
                      multiline
                      minRows={2}
                      maxRows={4}
                      required
                    />
                  </StyledFormControl>
                  <StyledFormControl>
                    <InputLabel>5. Phương thức thanh toán</InputLabel>
                    <Stack
                      direction={isMobile ? 'column' : 'row'}
                      spacing={2}
                      mt={6}
                    >
                      {paymentMethods.map((method) => (
                        <MyButton
                          key={method.value}
                          variant={
                            formData.payment === method.value
                              ? 'contained'
                              : 'outlined'
                          }
                          onClick={() => handleSelectPayment(method.value)}
                          startIcon={
                            <img
                              src={logoNimbus}
                              alt="Logo"
                              style={{ height: 32 }}
                            />
                          }
                        >
                          {method.label}
                        </MyButton>
                      ))}
                    </Stack>
                  </StyledFormControl>
                  <Button
                    type="submit"
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
                </Stack>
              </Form>
              {/* Modal chọn khung giờ */}
              <Dialog
                open={openTimeModal}
                onClose={() => setOpenTimeModal(false)}
                maxWidth="xs"
                fullWidth
              >
                <DialogTitle>Chọn khung giờ</DialogTitle>
                <DialogContent>
                  <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                    sx={{ mt: 1 }}
                  >
                    {timeOptions.map((option) => (
                      <Grid
                        item
                        xs={3}
                        key={option.value}
                        display="flex"
                        justifyContent="center"
                      >
                        <MyButton
                          variant={
                            formData.time === option.value
                              ? 'contained'
                              : 'outlined'
                          }
                          onClick={() => handleSelectTime(option.value)}
                          sx={{
                            width: 150,
                            fontSize: 15,
                            textAlign: 'center',
                            p: 0,
                            mb: 0,
                          }}
                        >
                          {option.label}
                        </MyButton>
                      </Grid>
                    ))}
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setOpenTimeModal(false)}
                    color="inherit"
                  >
                    Đóng
                  </Button>
                </DialogActions>
              </Dialog>
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
                Loại dịch vụ: <b>{selectedService?.label || '-'}</b>
              </Typography>
              <Typography variant="body1">
                Chuyên khoa: <b>{selectedSpecialty?.label || '-'}</b>
              </Typography>
              <Typography variant="body1">
                Bác sĩ: <b>{selectedDoctor?.label || '-'}</b>
              </Typography>
              <Typography variant="body1">
                Ngày khám: <b>{formatDate(formData.date)}</b>
              </Typography>
              <Typography variant="body1">
                Khung giờ: <b>{selectedTime?.label || '-'}</b>
              </Typography>
              <Typography variant="body1">
                Vấn đề: <b>{formData.note || '-'}</b>
              </Typography>
              <Typography variant="body1">
                Thanh toán: <b>{selectedPayment?.label || '-'}</b>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
