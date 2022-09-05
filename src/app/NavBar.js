import * as React from "react"
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

const NavBar = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">MI COMPA APP</Link>
          </Typography>
          <Button color="inherit" onClick={() => navigate("/addresses")}>
            Ver lista de códigos postales
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
