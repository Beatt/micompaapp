import * as React from "react"
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import DetailsIcon from "@mui/icons-material/Details"
import { addressesDelete, addressesGetMany } from "../../api/addresses"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"

const { useState, useEffect } = React

const Addresses = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const [addresses, setAddresses] = useState([])

  useEffect(() => {
    handleUsersGet()
  }, [])

  function handleUsersGet() {
    addressesGetMany().then(({ data }) => {
      setAddresses(data)
    })
  }

  async function handleDelete(id) {
    await addressesDelete(id)
    enqueueSnackbar("¡Se ha eliminado correctamente la dirección!", { variant: "success" })
    handleUsersGet()
  }

  function handleEdit(id) {
    navigate(`/addresses/${id}/edit`)
  }

  function handleDetails(id) {
    navigate(`/addresses/${id}`)
  }

  return (
    <Box boxShadow={5} p={5}>
      <Typography variant="h1">¡Direcciones!</Typography>
      <Box mb={2}>
        <Typography variant="p">
          Gracias a ti, pronto llegaremos a la meta y tendremos todos los códigos postales disponibles en nuestra API.
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Código postal</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Municipio/Alcaldía</TableCell>
              <TableCell align="center">Colonia</TableCell>
              <TableCell align="center">Calle</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addresses.map((address) => (
              <TableRow key={address.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="center">{address.cp}</TableCell>
                <TableCell align="center">{address.state}</TableCell>
                <TableCell align="center">{address.municipality}</TableCell>
                <TableCell align="center">{address.suburb}</TableCell>
                <TableCell align="center">{address.street}</TableCell>
                <TableCell align="center">
                  <Grid item xs={8}>
                    <IconButton data-testid="edit" onClick={() => handleEdit(address.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton data-testid="delete" onClick={() => handleDelete(address.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton data-testid="details" onClick={() => handleDetails(address.id)}>
                      <DetailsIcon />
                    </IconButton>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Addresses
