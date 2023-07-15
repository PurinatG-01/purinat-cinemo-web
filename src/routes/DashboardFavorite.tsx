import React, { useEffect, useState } from "react"
import DashboardLayout from "../layout/DashboardLayout"
import { useNavigate } from "react-router-dom"
import { ROUTE_PATH } from "../assets/config/route"
import { useAppSelector } from "../store/hooks"
import { getJWT } from "../store/user"
import useMovie from "../hooks/useMovie"
import MovieGridList from "../components/MovieGridList"
import { Alert } from "@mui/material"

export default function DashboardFavorite() {
  const navigate = useNavigate()
  const jwt = useAppSelector(getJWT)
  const [queryError, setQueryError] = useState<string>("")

  const {
    favoriteMovieList,
    queryMovieList,
    isLoading: isMovieListLoading,
  } = useMovie()

  useEffect(() => {
    if (!jwt) {
      navigate(ROUTE_PATH.LOGIN)
    }
    queryMovieList().catch((error: Error) => {
      setQueryError(error.message)
    })
  }, [])

  return (
    <DashboardLayout>
      {isMovieListLoading ? (
        <span>Loading ...</span>
      ) : queryError ? (
        <Alert
          severity="error"
          style={{ maxWidth: 240, margin: "24px auto", width: "100%" }}
        >
          {queryError}
        </Alert>
      ) : favoriteMovieList.length > 0 ? (
        <MovieGridList movieList={favoriteMovieList} />
      ) : (
        <Alert
          severity="info"
          style={{ maxWidth: 240, margin: "24px auto", width: "100%" }}
        >
          No favorite movie in list
        </Alert>
      )}
    </DashboardLayout>
  )
}
