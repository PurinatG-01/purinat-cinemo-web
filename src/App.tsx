import React from "react"
import { RouterProvider } from "react-router-dom"
import "./App.css"
import { store } from "./store"
import { Provider } from "react-redux"
import { router } from "./assets/config/route"

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App
