import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import useLogin from "../hooks/useLogin"
import { useNavigate } from "react-router-dom"
import Alert from "@mui/material/Alert"
import styled from "styled-components"
import { useAppSelector } from "../store/hooks"
import { getJWT } from "../store/user"

const LoginPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 260px;
`

const PageTitle = styled(Typography)`
  text-align: center;
`
const SubmitButton = styled(Button)`
  ${({ disabled }) =>
    disabled &&
    `
        opacity: 0.5;
        pointer-events: none;
    `}
`
export default function Login() {
  const { login, isLoading: isLoginLoading } = useLogin()
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")
  const jwt = useAppSelector(getJWT)
  const navigate = useNavigate()

  useEffect(() => {
    if (!jwt) return
    navigate("/dashboard")
  }, [jwt])

  const onInputChange = (type: string, value: string) => {
    setError("")
    switch (type) {
      case "username":
        setUsername(value)
        break
      case "password":
        setPassword(value)
        break
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!!username && !!password) {
      login(username, password)
        .then((data) => {
          if (data.token) {
            navigate("/dashboard")
          }
        })
        .catch((error: Error) => {
          setError(error.message)
        })
    }
  }

  return (
    <LoginPageContainer>
      <Form onSubmit={onSubmit}>
        <PageTitle variant="h4">Cinemo Web</PageTitle>
        <TextField
          id="username-input"
          onChange={(e) => {
            onInputChange("username", e.target.value)
          }}
          label="Username"
          variant="outlined"
          value={username}
        />
        <TextField
          id="password-input"
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => {
            onInputChange("password", e.target.value)
          }}
        />
        <SubmitButton
          variant="contained"
          type="submit"
          disabled={isLoginLoading}
        >
          Sign in
        </SubmitButton>
        {!!error && <Alert severity="error">{error}</Alert>}
      </Form>
    </LoginPageContainer>
  )
}
