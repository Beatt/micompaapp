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
import { usersDelete, usersGetMany } from "../../api/users"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"

const { useState, useEffect } = React

const Users = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  useEffect(() => {
    handleUsersGet()
  }, [])

  function handleUsersGet() {
    usersGetMany().then(({ data }) => {
      setUsers(data)
    })
  }

  async function handleDelete(id) {
    await usersDelete(id)
    enqueueSnackbar("¡Se ha eliminado correctamente el código postal!", { variant: "success" })
    handleUsersGet()
  }

  function handleEdit(id) {
    navigate(`/users/${id}`)
  }

  return (
    <Box boxShadow={5} p={5}>
      <Typography variant="h1">¡Códigos postales!</Typography>
      <Box mb={2}>
        <Typography variant="p">
          Gracias a ti, pronto llegaremos a la meta y tendremos todos los códigos postales disponibles en nuestra API.
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Usuario</TableCell>
              <TableCell align="center">Código postal</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Municipio/Alcaldía</TableCell>
              <TableCell align="center">Colonia</TableCell>
              <TableCell align="center">Calle</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{user.user}</TableCell>
                <TableCell align="center">{user.cp}</TableCell>
                <TableCell align="center">{user.estado}</TableCell>
                <TableCell align="center">{user.municipioalcaldia}</TableCell>
                <TableCell align="center">{user.suburb}</TableCell>
                <TableCell align="center">{user.street}</TableCell>
                <TableCell align="center">
                  <Grid item xs={8}>
                    <IconButton data-testid="edit" onClick={() => handleEdit(user.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton data-testid="delete" onClick={() => handleDelete(user.id)}>
                      <DeleteIcon />
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

export default Users
