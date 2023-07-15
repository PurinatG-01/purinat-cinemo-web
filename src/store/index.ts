import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./user"
import movieReducer from "./movie"
import modalReducer from "./modal"
export const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
    modal: modalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
