import React, { useEffect, useState } from "react"
import { Movie } from "../model/movie"
import FavoriteIcon from "@mui/icons-material/Favorite"
import CheckIcon from "@mui/icons-material/Check"
import styled from "styled-components"
import { Button, Chip, Typography } from "@mui/material"
import {
  getFavoriteMovieList,
  getMovieList,
  toggleFavoriteMovie,
} from "../store/movie"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import dayjs from "dayjs"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"

const MovieDetailContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  max-width: 800px;
  position: relative;
`
const MovieDetailInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: scroll;
`
const Description = styled(Typography)`
  text-indent: 1rem;
`
const MovieCover = styled.img`
  max-height: 30vh;
  object-fit: contain;
`
const FlexList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-self: flex-start;
`

const MovieDetailActions = styled.div`
  display: flex;
  bottom: 0;
  left: 0;
  position: sticky;
  background-color: #fff;
  padding: 16px;
`

const FavoriteButton = styled(Button)`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  &:focus {
    outline: none;
  }
`

export default function MovieDetail(props: Props) {
  const { id } = props
  const dispatch = useAppDispatch()
  const movieList = useAppSelector(getMovieList)
  const favoriteMovieList = useAppSelector(getFavoriteMovieList)
  const [movie, setMovie] = useState<Movie>()
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const movie = movieList.find((item) => item.id === id)
    setMovie(movie)
  }, [id, movieList])

  useEffect(() => {
    setIsFavorite(!!favoriteMovieList.find((item) => item.id === id))
  }, [favoriteMovieList, id])

  const toggleFavorite = (movieId: number) => {
    dispatch(toggleFavoriteMovie(movieId))
  }

  const onClickFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite(id)
  }

  return movie ? (
    <MovieDetailContainer>
      <MovieCover
        src={movie.poster_url}
        srcSet={movie.poster_url}
        alt={movie.title_en}
        loading="lazy"
      />
      <MovieDetailInnerContainer>
        <Typography variant="h4">{movie.title_en}</Typography>
        <Description variant="body2" color="text.secondary">
          {movie.synopsis_en}
        </Description>
        {movie.release_date ? (
          <>
            <Typography variant="h6">Released at</Typography>
            <FlexList>
              <Chip
                icon={<CalendarMonthIcon />}
                label={dayjs(movie.release_date).format("DD MMM YYYY")}
                color="info"
              ></Chip>
            </FlexList>
          </>
        ) : (
          <></>
        )}
        {movie.genre ? (
          <>
            <Typography variant="h6">Genre</Typography>
            <FlexList>
              {movie.genre.split("/").map((item, index) => (
                <Chip key={index} label={item} />
              ))}
            </FlexList>
          </>
        ) : (
          <></>
        )}
        {movie.rating ? (
          <>
            <Typography variant="h6">Rating</Typography>
            <FlexList>
              <Chip label={movie.rating} />
            </FlexList>
          </>
        ) : (
          <></>
        )}
        {movie.actor ? (
          <>
            <Typography variant="h6">Actors</Typography>
            <FlexList>
              {movie.actor.split("/").map((item, index) => (
                <Chip key={index} label={item} />
              ))}
            </FlexList>
          </>
        ) : (
          <></>
        )}
        {movie.director ? (
          <>
            <Typography variant="h6">Director</Typography>
            <FlexList>
              {movie.director.split("/").map((item, index) => (
                <Chip key={index} label={item} />
              ))}
            </FlexList>
          </>
        ) : (
          <></>
        )}
      </MovieDetailInnerContainer>
      <MovieDetailActions>
        <FavoriteButton
          size="small"
          onClick={onClickFavorite}
          variant={isFavorite ? "contained" : "outlined"}
        >
          {isFavorite ? <CheckIcon /> : <FavoriteIcon />}
          Favorite
        </FavoriteButton>
      </MovieDetailActions>
    </MovieDetailContainer>
  ) : (
    <></>
  )
}

export interface MovieDetailProps {
  id: number
}

type Props = MovieDetailProps
