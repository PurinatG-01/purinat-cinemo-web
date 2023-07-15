import React from "react"
import { useAppSelector } from "../store/hooks"
import { getJWT, getUsername, getUserId } from "../store/user"
export default function Dashboard() {
  const jwt = useAppSelector(getJWT)
  const username = useAppSelector(getUsername)
  const userId = useAppSelector(getUserId)
  return <div>Dashboard| {jwt} | {username} | {userId}</div>
}
