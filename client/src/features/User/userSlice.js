import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email: '',
    _id: '',
    isLogin: false,
    accessToken: '',
  },
  reducers: {},
})

// need to export actions

export default userSlice.reducer
