import React, { useEffect, useState } from "react"
import { useAppSelector } from "../store/hooks"
import { getJWT } from "../store/user"
import { useNavigate } from "react-router-dom"
import DashboardLayout from "../layout/DashboardLayout"
import useMovie from "../hooks/useMovie"
import Alert from "@mui/material/Alert"
import MovieGridList from "../components/MovieGridList"
import { ROUTE_PATH } from "../assets/config/route"
import { LinearProgress } from "@mui/material"
import styled from "styled-components"

const LoadProgress = styled(LinearProgress)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`
const AlertError = styled(Alert)`
  max-width: 240px;
  margin: 24px auto;
  width: 100%;
`

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
        <LoadProgress />
      ) : queryError ? (
        <AlertError severity="error">{queryError}</AlertError>
      ) : movieList.length > 0 ? (
        <MovieGridList movieList={movieList} />
      ) : (
        <AlertError severity="info">No favorite movie in list</AlertError>
      )}
    </DashboardLayout>
  )
}
