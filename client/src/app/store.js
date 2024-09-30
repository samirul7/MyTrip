import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/User/authSlice'
import userReducer from '../features/User/userSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
})
