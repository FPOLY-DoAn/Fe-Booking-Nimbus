import * as yup from 'yup'

const AuthValid = yup.object().shape({
  fullName: yup
    .string()
    .required('Vui lòng nhập họ và tên')
    .min(2, 'Họ và tên phải có ít nhất 2 ký tự'),

  email: yup
    .string()
    .required('Vui lòng nhập email')
    .email('Email không hợp lệ'),

  sdt: yup
    .string()
    .required('Vui lòng nhập số điện thoại')
    .matches(/^(03|05|07|08|09)\d{8}$/, 'Số điện thoại không hợp lệ'),

  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),

  passwordconfirm: yup
    .string()
    .required('Vui lòng xác nhận mật khẩu')
    .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp'),
})
export default AuthValid;