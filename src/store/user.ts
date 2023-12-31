import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "."
import jwt_decode from "jwt-decode"

export interface UserState {
  JWT: string
  username: string
  userId: number
}

export interface DecodedJWT {
  username: string
  userId: number
}

const initialState: UserState = {
  JWT: "",
  username: "",
  userId: 0,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      if (!action.payload) return
      const decoded = jwt_decode<DecodedJWT>(action.payload)
      state.JWT = action.payload
      state.username = decoded.username
      state.userId = decoded.userId
    },
    logout: (state) => {
      state.JWT = ""
      state.username = ""
      state.userId = 0
    },
  },
})

export const { login, logout } = userSlice.actions

export const getJWT = (state: RootState) => state.user.JWT
export const getUsername = (state: RootState) => state.user.username
export const getUserId = (state: RootState) => state.user.userId

export default userSlice.reducer
