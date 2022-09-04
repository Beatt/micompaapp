import * as React from "react"
import UsersForm from "../Form"
import { direccionByCP, coloniasByCP } from "../../../api/searchengines"
import { usersGetOne, usersUpdate } from "../../../api/users"
import { Box, Typography } from "@mui/material"
import { useSearchParams } from "react-router-dom"

const { useState, useEffect } = React

const UsersEdit = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")

  const [initValues, setInitialValues] = useState(null)

  useEffect(() => {
    usersGetOne({ id }).then(({ data }) => {
      setInitialValues(data)
    })
  }, [])

  return (
    <Box boxShadow={5} p={5}>
      <Typography variant="h1">¡Editar usuario!</Typography>
      <Box mb={2}>
        <Typography variant="p">
          Gracias a ti vamos a mantener nuestra API actualizada, no lo olvides eres parte de esto.
        </Typography>
      </Box>
      {initValues && <UsersForm {...{ usersSave: usersUpdate, direccionByCP, coloniasByCP, initValues }} />}
    </Box>
  )
}

export default UsersEdit
