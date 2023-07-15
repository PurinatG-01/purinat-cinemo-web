import React, { useState } from "react"
import { Movie } from "../model/movie"
export default function useFavoriteMovie() {
  const [favoriteMovieList, setFavoriteMovieList] = useState<Movie[]>([])

  const addFavoriteMovie = (movie: Movie) => {
    // TODO: add movie to list
  }
  const removeFavoriteMovie = (movie: Movie) => {
    // TODO: remove movie to list
  }
  return { favoriteMovieList, addFavoriteMovie, removeFavoriteMovie }
}
