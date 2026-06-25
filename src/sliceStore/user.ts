import { createSlice } from "@reduxjs/toolkit";
import type { User } from "@supabase/supabase-js";

type UsersState = {
  users: User | null;
  errorUsers: string | null;
};

const initialState: UsersState = {
  users: null,
  errorUsers: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
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