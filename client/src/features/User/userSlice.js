import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    // name: '',
    // email: '',
    // _id: '',
    // isLogin: false,
    // accessToken: '',
    token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload
      state.token = accessToken
    },
    logOut: (state) => {
      state.token = null
    },
  },
})

// need to export actions

export const { setCredentials, logOut } = userSlice.actions

export default userSlice.reducer
