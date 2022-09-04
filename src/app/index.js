import * as React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "../views/Home"
import NavBar from "./NavBar"
import { Grid } from "@mui/material"
import UsersCreate from "../views/Users/Create"

function App() {
  return (
    <Grid container>
      <Grid item sm={2} />
      <Grid item sm={8}>
        <NavBar />
        <Grid container mt={5}>
          <Grid item sm={12}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users/create" element={<UsersCreate />} />
            </Routes>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default App
