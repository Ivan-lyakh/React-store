import { createSlice } from "@reduxjs/toolkit";




const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: null,
    errorUsers: null
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    },
    resetUsers: (state) => {
      state.users = null
    },
    setErrorUsers: (state, action) => {
      state.errorUsers = action.payload
    }
  }
})

export const { setUsers, resetUsers, setErrorUsers } = usersSlice.actions

export default usersSlice.reducer