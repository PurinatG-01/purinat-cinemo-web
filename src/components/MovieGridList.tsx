import React from "react"
import MovieCard from "./MovieCard"
import { Movie } from "../model/movie"
import styled from "styled-components"
const MovieList = styled.ol`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding: 16px 16px;
  margin: 0;
  width: 100%;
  @media screen and (min-width: 400px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
`

const MovieListItem = styled.li`
  list-style: none;
`

export default function MovieGridList(props: Props) {
  const { movieList } = props
  return (
    <MovieList>
      {movieList.map((item, index) => (
        <MovieListItem key={index}>
          <MovieCard {...item} />
        </MovieListItem>
      ))}
    </MovieList>
  )
}

interface MovieGridListProps {
  movieList: Movie[]
}

type Props = React.PropsWithChildren<MovieGridListProps>
