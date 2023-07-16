import { useState } from "react"
import { validateLogin } from "../assets/config/mock"
import { useAppDispatch } from "../store/hooks"
import { login as storeLogin, logout as storeLogout } from "../store/user"
import useCookie from "react-use-cookie"
import { COOKIE_JWT } from "../assets/config/user"

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
  const [userToken, setUserToken] = useCookie(COOKIE_JWT, "")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const login = async (username: string, password: string) => {
    setIsLoading(true)
    try {
      const token = await queryLogin(username, password)
      setUserToken(token, {
        days: 365,
        SameSite: "Strict",
        Secure: true,
      })
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
    setUserToken("")
    dispatch(storeLogout())
  }
  return { login, logout, isLoading }
}
