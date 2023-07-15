import React, { useEffect } from "react"
import { useAppSelector } from "../store/hooks"
import { getJWT, getUserId, getUsername } from "../store/user"
import { useNavigate } from "react-router-dom"
import DashboardLayout from "../layout/DashboardLayout"
export default function Dashboard() {
  const jwt = useAppSelector(getJWT)
  const userId = useAppSelector(getUserId)
  const username = useAppSelector(getUsername)
  const navigate = useNavigate()

  useEffect(() => {
    if (jwt) return
    navigate("/login")
  }, [])
  return (
    <DashboardLayout>
      {jwt} | {userId} | {username}
    </DashboardLayout>
  )
}
