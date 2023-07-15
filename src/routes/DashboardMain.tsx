import React, { useEffect, useState } from "react"
import { useAppSelector } from "../store/hooks"
import { getJWT } from "../store/user"
import { useNavigate } from "react-router-dom"
import DashboardLayout from "../layout/DashboardLayout"
import useMovie from "../hooks/useMovie"
import Alert from "@mui/material/Alert"
import MovieGridList from "../components/MovieGridList"
import { ROUTE_PATH } from "../assets/config/route"

export default function Dashboard() {
  const jwt = useAppSelector(getJWT)
  const navigate = useNavigate()
  const [queryError, setQueryError] = useState<string>("")
  const {
    isLoading: isMovieListLoading,
    queryMovieList,
    movieList,
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
      ) : movieList.length > 0 ? (
        <MovieGridList movieList={movieList} />
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
