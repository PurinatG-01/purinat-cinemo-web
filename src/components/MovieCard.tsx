import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"
import { Movie } from "../model/movie"
import styled from "styled-components"
import FavoriteIcon from "@mui/icons-material/Favorite"
import CheckIcon from "@mui/icons-material/Check"
import { useAppDispatch } from "../store/hooks"
import { toggleFavoriteMovie } from "../store/movie"
import useModal from "../hooks/useModal"
import MovieDetail from "./MovieDetail"

const MovieCardContainer = styled(Card)`
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: unset;
  &:hover {
    opacity: 0.8;
    transform: translateY(-8px);
  }
`

const MovieCardDescription = styled(Typography)`
  text-indent: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const FavoriteBadge = styled.div`
  position: absolute;
  top: -8px;
  left: -8px;
  padding: 4px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  z-index: 10;
`
const FavoriteButton = styled(Button)`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  &:focus {
    outline: none;
  }
`
const MovieCardActions = styled(CardActions)`
  padding: 0;
  margin-top: auto;
  padding-top: 16px;
`

const MovieCardMedia = styled(CardMedia)`
  height: 100vh;
  max-height: 360px;
  border-top-left-radius: 4;
  border-top-right-radius: 4;
`

const MovieCardContent = styled(CardContent)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export default function MovieCard(props: Props) {
  const { title_en, poster_url, synopsis_en, isFavorite, id } = props
  const { openModal } = useModal()
  const dispatch = useAppDispatch()

  const toggleFavorite = (movieId: number) => {
    dispatch(toggleFavoriteMovie(movieId))
  }

  const onClickFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleFavorite(id)
  }

  const onClickCard = (e: React.MouseEvent) => {
    e.stopPropagation()
    openModal(<MovieDetail id={id} />)
  }

  return (
    <MovieCardContainer onClick={onClickCard}>
      {isFavorite && (
        <FavoriteBadge>
          <FavoriteIcon style={{ color: "pink" }} />
        </FavoriteBadge>
      )}
      <MovieCardMedia image={poster_url} title="green iguana" />
      <MovieCardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title_en}
        </Typography>
        <MovieCardDescription variant="body2" color="text.secondary">
          {synopsis_en}
        </MovieCardDescription>
        <MovieCardActions>
          <FavoriteButton
            size="small"
            onClick={onClickFavorite}
            variant={isFavorite ? "contained" : "outlined"}
          >
            {isFavorite ? <CheckIcon /> : <FavoriteIcon />}
            Favorite
          </FavoriteButton>
        </MovieCardActions>
      </MovieCardContent>
    </MovieCardContainer>
  )
}

export interface MovieCardProps extends Movie {
  isFavorite?: boolean
}

type Props = React.PropsWithChildren<MovieCardProps>
