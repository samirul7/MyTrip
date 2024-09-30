import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    _id: '66ed89e84b22ae3b1744551c',
    name: 'Samirul',
  },
  reducers: {
    setNameAndId: (state, action) => {
      state._id = action.payload._id
      state.name = action.payload.name
    },
    resetId: (state) => {
      state._id = null
    },
  },
})

export const { setNameAndId, resetId } = userSlice.actions
export default userSlice.reducer
