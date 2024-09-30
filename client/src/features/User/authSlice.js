import { createSlice } from '@reduxjs/toolkit'

const realToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmVkODllODRiMjJhZTNiMTc0NDU1MWMiLCJuYW1lIjoiU2FtaXJ1bCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTcyNzcwNTA4NywiZXhwIjoxNzI3NzkxNDg3fQ.KJBM_X3wwXJ1ZqPaDEtdyLWDolTaUwJrr_vZjJ6VJFc'

const fakeToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmVkODllODRiMjJhZTNiMTc0NDU1sWMiLCJuYW1lIjoiU2FtaXJ1bCIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImlhdCI6MTcyNzIwNTQ0NywiZXhwIjoxNzI3MjkxODQ3fQ.aKMTvlRRdyn4h2m3G2gsEVgB7DR7-zaNQZ77YMY0v-8'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: realToken, // null
  },
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload
      state.token = token
    },
    logOut: (state) => {
      state.token = null
    },
  },
})

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer
