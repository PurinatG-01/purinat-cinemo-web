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
import { useEffect, useState } from "react"

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
  color: #fa8397;
  padding: 8px 16px;
  border: 1px solid #fa8397;
  &:hover {
    color: #fff;
    background-color: #fa8397;
    border-color: #fa8397;
  }
  &:focus {
    outline: none;
  }
`
const MovieCardActions = styled(CardActions)`
  padding: 0;
  margin-top: auto;
  padding-top: 16px;
`

export default function MovieCard(props: MovieCardProps) {
  const { title_en, poster_url, synopsis_en, isFavorite } = props
  const [isFavorited, setIsFavorited] = useState<boolean>(!!isFavorite)

  useEffect(() => {
    setIsFavorited(!!isFavorite)
  }, [isFavorite])

  const onClickFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    // TODO: update movie store => favorite list
    console.log("click favorite")
  }

  const onClickCard = (e: React.MouseEvent) => {
    e.stopPropagation()
    // TODO: open movie modal
    console.log("click card")
  }

  return (
    <MovieCardContainer onClick={onClickCard}>
      {isFavorited && (
        <FavoriteBadge>
          <FavoriteIcon style={{ color: "pink" }} />
        </FavoriteBadge>
      )}
      <CardMedia
        sx={{
          minHeight: 140,
          maxHeight: 240,
          height: "100%",
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        }}
        image={poster_url}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title_en}
        </Typography>
        <MovieCardDescription variant="body2" color="text.secondary">
          {synopsis_en}
        </MovieCardDescription>
        <MovieCardActions>
          <FavoriteButton size="small" onClick={onClickFavorite}>
            Favorite
          </FavoriteButton>
        </MovieCardActions>
      </CardContent>
    </MovieCardContainer>
  )
}

interface MovieExtend extends Movie {
  isFavorite?: boolean
}

type MovieCardProps = React.PropsWithChildren<MovieExtend>
