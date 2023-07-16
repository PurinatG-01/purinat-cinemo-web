import React, { useEffect } from "react"
import styled from "styled-components"
import useInitiateApp from "../hooks/useInitiateApp"

const CleanLayoutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
  padding: 0;
  margin: 0;
`

export default function CleanLayout(props: Props) {
  const { children } = props
  const { initApp } = useInitiateApp()

  useEffect(() => {
    initApp()
  }, [])

  return <CleanLayoutContainer>{children}</CleanLayoutContainer>
}

type Props = React.PropsWithChildren
