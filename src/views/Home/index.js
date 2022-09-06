import * as React from "react"
import { Box, Typography } from "@mui/material"
import AddressesCreate from "../Addresses/Create"

const Home = () => {
  return (
    <Box boxShadow={5} p={5}>
      <Typography variant="h1">¡Bienvenido!</Typography>
      <Box mb={2}>
        <Typography variant="p">
          Agregar tu dirección es muy fácil con nuestra aplicación, solo ingresa la información con la que cuentes
        </Typography>
      </Box>
      <AddressesCreate />
    </Box>
  )
}

export default Home
