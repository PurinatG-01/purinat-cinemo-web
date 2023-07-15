import React, { useEffect, useState } from "react"
import axios from "axios"
import { Movie } from "../model/movie"

export default function useMovie() {
  const [movieList, setMovieList] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const queryMovieList = async () => {
    setIsLoading(true)
    const url = `https://www.majorcineplex.com/apis/get_movie_avaiable`
    try {
      const response = await axios.get<{ movies: Movie[] }>(url)
      console.log("> response : ", response)
      if (response.data.movies) {
        setMovieList(response.data.movies)
        return Promise.resolve(response.data.movies)
      }
    } catch (error) {
      console.error("> error : ", error)
      return Promise.reject(error)
    } finally {
      setIsLoading(false)
    }
  }
  return { queryMovieList, isLoading, movieList }
}
