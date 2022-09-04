import { Box, Grid, Typography } from "@mui/material"
import * as React from "react"
import { searchEnginesGetOne } from "../../../api/searchengines"
import { useParams } from "react-router-dom"

const { useState, useEffect } = React

const SearchEnginesShow = () => {
  const params = useParams()
  const id = params.id
  const [values, setValues] = useState(null)

  useEffect(() => {
    searchEnginesGetOne(id).then(({ data }) => setValues(data))
  }, [])

  return (
    <Box boxShadow={5} p={5}>
      <Typography variant="h1">¡Código postal - {id}!</Typography>
      <Box mb={2}>
        <Typography variant="p">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam eaque est, eveniet explicabo harum inventore
          ipsum nemo non nostrum obcaecati, placeat praesentium veritatis vero? Nam perspiciatis, quae. Consectetur,
          quis, vel!
        </Typography>
      </Box>
      <Box boxShadow={2}>
        <Grid container>
          <Grid item sm={3}>
            <Typography variant="h6">Código postal</Typography>
            <Typography variant="p">{values?.cp}</Typography>
          </Grid>
          <Grid item sm={3}>
            <Typography variant="h6">Pais</Typography>
            <Typography variant="p">{values?.country}</Typography>
          </Grid>
          <Grid item sm={3}>
            <Typography variant="h6">Estado</Typography>
            <Typography variant="p">{values?.estado}</Typography>
          </Grid>
          <Grid item sm={3}>
            <Typography variant="h6">Municipio/Alcaldía</Typography>
            <Typography variant="p">{values?.municipioalcaldia}</Typography>
          </Grid>
        </Grid>
        <Grid container mt={3}>
          <Grid item sm={3}>
            <Typography variant="h6">Calle</Typography>
            <Typography variant="p">{values?.street}</Typography>
          </Grid>
          <Grid item sm={3}>
            <Typography variant="h6">N. Exterior</Typography>
            <Typography variant="p">{values?.outdoorNumber}</Typography>
          </Grid>
          <Grid item sm={3}>
            <Typography variant="h6">N. Interior</Typography>
            <Typography variant="p">{values?.interiorNumber}</Typography>
          </Grid>
          <Grid item sm={3}>
            <Typography variant="h6">Colonia</Typography>
            <Typography variant="p">{values?.suburb}</Typography>
          </Grid>
        </Grid>
        <Grid container mt={3}>
          <Grid item sm={3}>
            <Typography variant="h6">Ciudad</Typography>
            <Typography variant="p">{values?.city}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default SearchEnginesShow
