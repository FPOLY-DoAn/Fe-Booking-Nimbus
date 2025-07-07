import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const CustomeTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 30,
    backgroundColor: '#e7f3fd',
    '&:hover fieldset': {
      borderColor: '#5f9ef3',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#5f9ef3',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#4b6cbf',
    '&.Mui-focused': {
      color: '#077bf3',
      paddingLeft: '5px',
    },
  },
});
export default CustomeTextField;