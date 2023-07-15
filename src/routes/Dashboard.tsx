import React, { useEffect } from "react"
import { useAppSelector } from "../store/hooks"
import { getJWT } from "../store/user"
import { useNavigate } from "react-router-dom"
export default function Dashboard() {
  const jwt = useAppSelector(getJWT)
  const navigate = useNavigate()

  useEffect(() => {
    if (jwt) return
    navigate("/")
  }, [])
  return <div></div>
}
