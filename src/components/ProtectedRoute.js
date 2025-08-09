import { Navigate, Outlet } from 'react-router'

const ProtectedRoute = () => {
  // Đọc accessToken và user từ localStorage
  // const accessToken = localStorage.getItem('accessToken')
  // const userStr = localStorage.getItem('user')
  // let role = null
  // if (userStr) {
  //   try {
  //     role = JSON.parse(userStr).role
  //   } catch {
  //     role = null
  //   }
  // }

  // if (!accessToken) {
  //   return <Navigate to="/login" replace />
  // }

  // // Chỉ cho phép admin vào route này
  // if (role !== 'admin') {
  //   return <Navigate to="/" replace />
  // }

  return <Outlet />
}

export default ProtectedRoute
