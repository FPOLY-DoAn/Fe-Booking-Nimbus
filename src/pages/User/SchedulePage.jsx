import React from 'react';
import { styled } from '@mui/material/styles';
import { Select, MenuItem, FormControl, Typography } from '@mui/material';

const Form = styled(FormControl)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '50px',
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
  marginInlineStart: -320,
}));

export default function SchedulePage() {
  const [value, setValue] = React.useState('');

  return (
    <Form>
      <Label variant="h6">1. Chọn loại dịch vụ</Label>
      <StyledSelect
        value={value}
        onChange={(e) => setValue(e.target.value)}
        variant="outlined"
        fullWidth={false}
      >
        <MenuItem value="kt">Khám thường</MenuItem>
        <MenuItem value="kdv">Khám dịch vụ</MenuItem>
      </StyledSelect>
    </Form>
  );
}
