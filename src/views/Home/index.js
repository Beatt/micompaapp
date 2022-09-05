import * as React from "react"
import { Box, Typography } from "@mui/material"
import AddressesCreate from "../Addresses/Create"

const Home = () => {
  return (
    <Box boxShadow={5} p={5}>
      <Typography variant="h1">¡Bienvenido!</Typography>
      <Box mb={2}>
        <Typography variant="p">
          Buscar tu dirección es muy fácil con nuestra aplicación, solo ingresa tu código postal y veamos si se
          encuentra en nuestra API.
        </Typography>
      </Box>
      <AddressesCreate />
    </Box>
  )
}

export default Home
