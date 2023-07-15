import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import Login from "./routes/Login"
import DashboardMain from "./routes/DashboardMain"
import { store } from "./store"
import { Provider } from "react-redux"
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <DashboardMain />,
  },
])

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
