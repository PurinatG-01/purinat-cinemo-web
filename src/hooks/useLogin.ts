import { useState } from "react"
import { validateLogin } from "../assets/config/mock"
import { useAppDispatch } from "../store/hooks"
import { login as storeLogin, logout as storeLogout } from "../store/user"

const queryLogin = async (username: string, password: string) => {
  // Mocking for an actual API call
  const result = validateLogin(username, password)
  if (result) {
    return Promise.resolve(result.token)
  } else {
    return Promise.reject(new Error("Login failed"))
  }
}
export default function useLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const login = async (username: string, password: string) => {
    setIsLoading(true)
    try {
      const token = await queryLogin(username, password)
      dispatch(storeLogin(token))
      return Promise.resolve({ token })
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    dispatch(storeLogout())
  }
  return { login, logout, isLoading }
}
