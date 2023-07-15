import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./App.css"
import Login from "./routes/Login"
import Dashboard from "./routes/Dashboard"
import { store } from "./store"
import { Provider } from "react-redux"
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Dashboard />,
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
