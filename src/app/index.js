import * as React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "../views/Home"
import NavBar from "./NavBar"
import { Grid } from "@mui/material"
import Addresses from "../views/Addresses"
import AddressesEdit from "../views/Addresses/Edit"
import AddressesShow from "../views/Addresses/Show"

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
              <Route path="/addresses" element={<Addresses />} />
              <Route path="/addresses/:id/edit" element={<AddressesEdit />} />
              <Route path="/addresses/:id" element={<AddressesShow />} />
            </Routes>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default App
