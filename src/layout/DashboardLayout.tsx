import React, { useState } from "react"
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
import { Divider, Typography } from "@mui/material"
import { NavbarConfigList, ROUTE_PATH } from "../assets/config/route"
import LogoutIcon from "@mui/icons-material/Logout"
import useLogin from "../hooks/useLogin"
import { Link, useNavigate } from "react-router-dom"

const DashboardLayoutContainer = styled.div`
  display: flex;
  position: relative;
  padding: 16px;
  flex-direction: column;
`

const DashboardLayoutInnerContainer = styled.section`
  display: flex;
  width: 100%;
  overflow: scroll;
`

const DrawerButton = styled(Button)`
  position: fixed;
  top: 8px;
  left: 8px;
  z-index: 10;
  height: 40px;
  max-height: 40px;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background: #fff;
  &:focus {
    outline: none;
  }
  &:hover {
    background: #fff;
  }
`

const OverLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
`

export default function DashboardLayout(props: DashboardLayoutProps) {
  const { children } = props
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const { logout } = useLogin()
  const navigate = useNavigate()

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

  const list = () => (
    <Box
      sx={{ width: 250 }}
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
    </Box>
  )

  return (
    <DashboardLayoutContainer>
      <DrawerButton onClick={toggleDrawer}>
        <MenuIcon />
      </DrawerButton>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        {list()}
      </Drawer>
      <Typography
        component="h1"
        variant="h4"
        style={{ padding: "0 48px", textAlign: "center", fontWeight: "bold" }}
      >
        Cinemo Web
      </Typography>
      <DashboardLayoutInnerContainer>{children}</DashboardLayoutInnerContainer>
    </DashboardLayoutContainer>
  )
}

type DashboardLayoutProps = React.PropsWithChildren
