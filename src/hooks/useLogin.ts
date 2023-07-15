import { useState } from "react"
import { loginJwtList } from "../config/mock"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../store/hooks"
import { setUserToken } from "../store/user"

const queryLogin = async (username: string, password: string) => {
  // Mocking for an actual API call
  const result = loginJwtList.find((item) => item.username === username)
  if (result) {
    return Promise.resolve(result.token)
  } else {
    return Promise.reject(new Error("Login failed"))
  }
}
export default function useLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const login = async (username: string, password: string) => {
    setIsLoading(true)
    try {
      const token = await queryLogin(username, password)
      dispatch(setUserToken(token))
      navigate("/dashboard")
      return Promise.resolve({ token })
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    } finally {
      setIsLoading(false)
    }
  }
  return { login, isLoading }
}
