import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import MenuIcon from "@mui/icons-material/Menu"
import { Avatar, Divider, Typography } from "@mui/material"
import { NavbarConfigList, ROUTE_PATH } from "../assets/config/route"
import LogoutIcon from "@mui/icons-material/Logout"
import useLogin from "../hooks/useLogin"
import { useNavigate } from "react-router-dom"
import GlobalModal from "../components/GlobalModal"
import useInitiateApp from "../hooks/useInitiateApp"
import { useAppSelector } from "../store/hooks"
import { getUsername } from "../store/user"

const DashboardLayoutContainer = styled.div`
  display: flex;
  position: relative;
  padding: 16px;
  flex-direction: column;
  padding-top: 72px;
`

const DashboardLayoutInnerContainer = styled.section`
  display: flex;
  width: 100%;
  overflow: scroll;
`

const DrawerButton = styled(Button)`
  height: 40px;
  max-height: 40px;
  padding: 8px;
  &:focus {
    outline: none;
  }
  &:hover {
    background: #fff;
  }
`

const UserBadge = styled.div`
  white-space: nowrap;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  &:focus {
    outline: none;
  }
  &:hover {
    background: #fff;
  }
`

const NavBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  min-height: 64px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ListConatiner = styled(Box)`
  width: 250px;
`

export default function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props
  const { initApp } = useInitiateApp()
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const { logout } = useLogin()
  const navigate = useNavigate()
  const username = useAppSelector(getUsername)

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const onClickLogout = () => {
    logout()
    setTimeout(() => {
      navigate(ROUTE_PATH.LOGIN)
    }, 0)
  }

  const onClickNavItem = (path: string) => () => {
    navigate(path)
  }

  useEffect(() => {
    initApp()
  }, [])

  const list = () => (
    <ListConatiner
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {NavbarConfigList.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={onClickNavItem(item.path)}>
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={onClickLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Sign out" />
          </ListItemButton>
        </ListItem>
      </List>
    </ListConatiner>
  )

  return (
    <DashboardLayoutContainer>
      <NavBar>
        <DrawerButton onClick={toggleDrawer}>
          <MenuIcon />
        </DrawerButton>
        <UserBadge>
          <Avatar>{username[0]}</Avatar>
          {username}
        </UserBadge>
      </NavBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        {list()}
      </Drawer>
      <GlobalModal />
      <DashboardLayoutInnerContainer>{children}</DashboardLayoutInnerContainer>
    </DashboardLayoutContainer>
  )
}

type DashboardLayoutProps = React.PropsWithChildren
