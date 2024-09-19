import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/User/userSlice'
import { apiSlice } from './api/apiSlice'

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
