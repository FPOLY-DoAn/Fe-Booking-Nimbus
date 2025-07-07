import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/vi';
import dayjs from 'dayjs';

export default function BasicDatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="Chọn ngày"
          format="DD/MM/YYYY"
          defaultValue={dayjs()}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
