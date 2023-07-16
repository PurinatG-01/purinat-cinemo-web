import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Movie } from "../model/movie"
import { RootState } from "."

export interface MovieState {
  movieList: Movie[]
  favoriteMovieList: number[]
}

const initialState: MovieState = {
  movieList: [],
  favoriteMovieList: [],
}

export const movieSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleFavoriteMovie: (state, action: PayloadAction<number>) => {
      const movieId = action.payload
      if (state.favoriteMovieList.includes(movieId)) {
        state.favoriteMovieList = [
          ...state.favoriteMovieList.filter((_id) => _id !== movieId),
        ]
      } else {
        state.favoriteMovieList = [...state.favoriteMovieList, movieId]
      }
    },
    addFavoriteMovie: (state, action: PayloadAction<number>) => {
      const id = action.payload
      state.favoriteMovieList.push(id)
    },
    removeFavoriteMovie: (state, action: PayloadAction<number>) => {
      const id = action.payload
      state.favoriteMovieList = state.favoriteMovieList.filter(
        (_id) => _id !== id
      )
    },
    setMovieList: (state, action: PayloadAction<Movie[]>) => {
      const movieList = action.payload
      state.movieList = movieList
    },
  },
})

export const {
  addFavoriteMovie,
  removeFavoriteMovie,
  setMovieList,
  toggleFavoriteMovie,
} = movieSlice.actions

export const getMovieList = (state: RootState) => state.movie.movieList
export const getFavoriteMovieList = (state: RootState) =>
  state.movie.favoriteMovieList
    .map(
      (_id) => state.movie.movieList.find((movie) => movie.id === _id) || null
    )
    .filter((movie) => movie !== null) as Movie[]

export default movieSlice.reducer
