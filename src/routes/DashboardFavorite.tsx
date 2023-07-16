import React, { useEffect, useState } from "react"
import DashboardLayout from "../layout/DashboardLayout"
import { useNavigate } from "react-router-dom"
import { ROUTE_PATH } from "../assets/config/route"
import { useAppSelector } from "../store/hooks"
import { getJWT } from "../store/user"
import useMovie from "../hooks/useMovie"
import MovieGridList from "../components/MovieGridList"
import { Alert } from "@mui/material"
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
        <LoadProgress />
      ) : queryError ? (
        <AlertError severity="error">{queryError}</AlertError>
      ) : favoriteMovieList.length > 0 ? (
        <MovieGridList movieList={favoriteMovieList} />
      ) : (
        <AlertError severity="info">No favorite movie in list</AlertError>
      )}
    </DashboardLayout>
  )
}
