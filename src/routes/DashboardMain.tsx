import React, { useEffect, useState } from "react"
import { useAppSelector } from "../store/hooks"
import { getJWT, getUserId, getUsername } from "../store/user"
import { useNavigate } from "react-router-dom"
import DashboardLayout from "../layout/DashboardLayout"
import styled from "styled-components"
import useMovie from "../hooks/useMovie"
import MovieCard from "../components/MovieCard"
import Alert from "@mui/material/Alert"

const MovieList = styled.ol`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  padding: 16px 16px;
  margin: 0;
  width: 100%;
`

const MovieListItem = styled.li`
  list-style: none;
`

export default function Dashboard() {
  const jwt = useAppSelector(getJWT)
  const userId = useAppSelector(getUserId)
  const username = useAppSelector(getUsername)
  const navigate = useNavigate()
  const [queryError, setQueryError] = useState<string>("")
  const {
    isLoading: isMovieListLoading,
    queryMovieList,
    movieList,
  } = useMovie()

  useEffect(() => {
    if (!jwt) {
      navigate("/login")
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
      ) : (
        <MovieList>
          {movieList.map((item, index) => (
            <MovieListItem key={index}>
              <MovieCard {...item} />
            </MovieListItem>
          ))}
        </MovieList>
      )}
    </DashboardLayout>
  )
}
