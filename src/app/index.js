import * as React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "../views/Home"
import NavBar from "./NavBar"
import { Grid } from "@mui/material"
import SearchEngines from "../views/SearchEngines"
import SearchEnginesEdit from "../views/SearchEngines/Edit"

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
              <Route path="/searchEngines" element={<SearchEngines />} />
              <Route path="/searchEngines/:id" element={<SearchEnginesEdit />} />
            </Routes>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default App
