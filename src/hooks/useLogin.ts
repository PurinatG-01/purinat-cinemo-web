import { useState } from "react"
import { loginJwtList } from "../config/mock"
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

  const login = async (username: string, password: string) => {
    setIsLoading(true)
    try {
      const token = await queryLogin(username, password)
      
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
