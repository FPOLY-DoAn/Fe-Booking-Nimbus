import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Vui lòng nhập email')
    .email('Email không hợp lệ'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .min(3, 'Mật khẩu phải có ít nhất 6 ký tự'),
})

export const registerSchema = yup.object().shape({
  fullName: yup
    .string()
    .required('Vui lòng nhập họ và tên')
    .min(2, 'Họ và tên phải có ít nhất 2 ký tự'),

  gender: yup
    .string()
    .required('Vui lòng chọn giới tính')
    .oneOf(['M', 'F'], 'Giới tính không hợp lệ'),

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
    .min(3, 'Mật khẩu phải có ít nhất 6 ký tự'),

  passwordconfirm: yup
    .string()
    .required('Vui lòng xác nhận mật khẩu')
    .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp'),
})
