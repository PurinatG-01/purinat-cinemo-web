import DashboardIcon from "@mui/icons-material/Dashboard"
import FavoriteIcon from "@mui/icons-material/Favorite"
import DashboardMain from "../../routes/DashboardMain"
import Login from "../../routes/Login"
import DashboardFavorite from "../../routes/DashboardFavorite"
import { createBrowserRouter } from "react-router-dom"

export enum ROUTE_PATH {
  LOGIN = "/login",
  HOME = "/",
  FAVORITE = "/favorite",
}

export const NavbarConfigList = [
  { title: "Home", path: ROUTE_PATH.HOME, icon: DashboardIcon },
  { title: "Favorite", path: ROUTE_PATH.FAVORITE, icon: FavoriteIcon },
]

export const router = createBrowserRouter([
  {
    path: ROUTE_PATH.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTE_PATH.HOME,
    element: <DashboardMain />,
  },
  {
    path: ROUTE_PATH.FAVORITE,
    element: <DashboardFavorite />,
  },
])
