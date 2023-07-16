import React from "react"
import useCookie from "react-use-cookie"
import { COOKIE_JWT } from "../assets/config/user"
import { login as storeLogin } from "../store/user"
import { useAppDispatch } from "../store/hooks"

export default function useInitiateApp() {
  const [userToken, setUserToken] = useCookie(COOKIE_JWT, "")
  const dispatch = useAppDispatch()
  const initApp = () => {
    if (userToken) {
      dispatch(storeLogin(userToken))
    }
  }
  return { initApp }
}
