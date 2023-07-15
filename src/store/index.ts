import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./user"
import movieReducer from "./movie"
export const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
