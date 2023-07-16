import React, { useEffect, useState, useMemo } from "react"
import axios from "axios"
import { Movie } from "../model/movie"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import {
  getFavoriteMovieList,
  getMovieList,
  setMovieList as setStoreMovieList,
  toggleFavoriteMovie,
} from "../store/movie"
import { MovieCardProps } from "../components/MovieCard"

export default function useMovie() {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const movieList = useAppSelector(getMovieList)
  const favoriteMovieList = useAppSelector(getFavoriteMovieList)

  const resolvedMovieList = useMemo<MovieCardProps[]>(() => {
    const list = movieList.map((movie) => {
      const isFavorite = !!favoriteMovieList.find(
        (_movie) => _movie.id === movie.id
      )
      return {
        ...movie,
        isFavorite,
      }
    })
    return list
  }, [movieList, favoriteMovieList])
  const resolvedFavoriteMovieList = useMemo<MovieCardProps[]>(() => {
    const list = favoriteMovieList.map((movie) => ({
      ...movie,
      isFavorite: true,
    }))
    return list
  }, [favoriteMovieList])

  const queryMovieList = async () => {
    setIsLoading(true)
    const url = `https://www.majorcineplex.com/apis/get_movie_avaiable`
    try {
      const response = await axios.get<{ movies: Movie[] }>(url)
      if (response.data.movies) {
        const movieList = response.data.movies
        dispatch(setStoreMovieList(movieList))
        return Promise.resolve(response.data.movies)
      }
    } catch (error) {
      console.error("> error : ", error)
      return Promise.reject(error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleFavorite = (movieId: number) => {
    dispatch(toggleFavoriteMovie(movieId))
  }

  return {
    queryMovieList,
    isLoading,
    movieList: resolvedMovieList,
    favoriteMovieList: resolvedFavoriteMovieList,
    toggleFavoriteMovie: toggleFavorite,
  }
}
