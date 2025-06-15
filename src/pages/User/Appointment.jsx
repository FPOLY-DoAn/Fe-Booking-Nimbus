import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import logoNimbus from '../../assets/Nimbus.png';
import {
  Select,
  MenuItem,
  FormControl,
  Typography,
  TextField,
  Button,
} from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
  marginBottom: 2,
}));

const Form = styled(FormControl)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: 8,
  minWidth: 500,
  margin: '0 auto',
  textAlign: 'center',
  '& .MuiSelect-select': {
    padding: theme.spacing(1.5),
    textAlign: 'center',
  },
  '& fieldset': {
    border: '1px solid #ccc',
  },
}));

const Label = styled(Typography)(({}) => ({
  marginBottom: 1,
  fontWeight: 100,
}));

const MyPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  Width: 200,
  margin: '0 auto',
}));

const UnderLine = styled('div')(() => ({
  width: '100%',
  borderBottom: '2px solid rgb(0, 0, 0)',
  marginBottom: '16px',
}));

const handleSubmit = (e) => {};

const serviceTypeOptions = [
  { value: 'kt', label: 'Khám thường' },
  { value: 'kdv', label: 'Khám dịch vụ' },
];

const MyButton = styled(Button)(({ theme }) => ({
  minWidth: 500,
  height: 50,
  border: '1px solid #ccc',
  color: 'black',
  marginBottom: 10,
}));
const specialtyOptions = [
  {
    value: 'khoaTamThan',
    label: 'Khoa tâm thần',
  },
  {
    value: 'khoaTaiMuiHong',
    label: 'Khoa tai mũi họng',
  },
  {
    value: 'khoaMat',
    label: 'Khoa mắt',
  },
  {
    value: 'khoaRangHamMat',
    label: 'Khoa răng hàm mặt',
  },
];

export default function Appointment() {
  const [serviceType, setServiceType] = React.useState('');
  const [specialty, setSpecialty] = React.useState('');
  const [note, setNote] = React.useState('');

  const selectedService = serviceTypeOptions.find(
    (option) => option.value === serviceType,
  );

  const selectedSpecialty = specialtyOptions.find(
    (option) => option.value === specialty,
  );

  return (
    <Box sx={{ flexGrow: 2, margin: 2 }}>
      <Grid container spacing={2} columns={12}>
        <Grid size={6}>
          <Form>
            <Label variant="h6" sx={{ marginInlineStart: -39 }}>
              1. Chọn loại hình khám
            </Label>
            <StyledSelect
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              variant="outlined"
              fullWidth={false}
            >
              {serviceTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </StyledSelect>

            <Label variant="h6" sx={{ marginInlineStart: -37.5 }}>
              2. Chọn chuyên khoa
            </Label>
            <StyledSelect
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              variant="outlined"
              fullWidth={false}
            >
              {specialtyOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </StyledSelect>

            <Label variant="h6" sx={{ marginInlineStart: -37.5 }}>
              3. Chọn theo nhu cầu
            </Label>

            <Label variant="h6" sx={{ marginInlineStart: -44.5 }}>
              4. Nhập vấn đề
            </Label>
            <TextField
              value={note}
              onChange={(e) => setNote(e.target.value)}
              sx={{ minWidth: 500 }}
            />
            <Label variant="h6" sx={{ marginInlineStart: -35.5 }}>
              5. Hình thức thanh toán
            </Label>
            <MyButton>
              <img
                src={logoNimbus}
                alt="Logo"
                style={{ height: 90, marginInlineEnd: 100, margin: 40 }}
              />
              MOMO
            </MyButton>
            <MyButton>
              <img
                src={logoNimbus}
                alt="Logo"
                style={{ height: 90, marginInlineEnd: 100, margin: 40 }}
              />
              Thanh toán tại quầy
            </MyButton>
          </Form>
        </Grid>
        <Grid size={6}>
          <MyPaper>
            <Label variant="h5">Thông tin đặt khám</Label>
            <UnderLine></UnderLine>
            <Label variant="h6">Tên bệnh viện</Label>
            <UnderLine></UnderLine>
            <Label variant="h7">
              Loại hình khám : {selectedService?.label}
            </Label>
            <br />
            <Label variant="h7">Chuyên khoa : {selectedSpecialty?.label}</Label>
            <br />
            <Label variant="h7">Bác sĩ : </Label>
            <br />
            <Label variant="h7">Ngày giờ khám : </Label>
            <br />
            <Label variant="h7">Vấn đề : {note}</Label>
            <br />
            <Button
              variant="contained"
              sx={{
                marginTop: 1,
                mx: 'auto',
                width: '80%',
                alignItems: 'center',
                display: 'block ',
              }}
            >
              Đặt lịch
            </Button>
          </MyPaper>
        </Grid>
      </Grid>
    </Box>
  );
}
