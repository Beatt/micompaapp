import * as React from "react"
import AddressesForm from "../Form"
import { addressesGetOne, addressesUpdate } from "../../../api/addresses"
import { catalogsPostalCode, catalogsSuburbsByPostalCode } from "../../../api/catalogs"
import { Box, Typography } from "@mui/material"
import { useParams } from "react-router-dom"

const { useState, useEffect } = React

const AddressesEdit = () => {
  const params = useParams()
  const id = params.id

  const [initValues, setInitialValues] = useState(null)

  useEffect(() => {
    addressesGetOne(id).then(({ data }) => {
      setInitialValues(data)
    })
  }, [])

  async function handleSubmit(data) {
    try {
      await addressesUpdate(id, data)
      return Promise.resolve()
    } catch {
      return Promise.reject()
    }
  }

  return (
    <Box boxShadow={5} p={5}>
      <Typography variant="h1">¡Editar código postal!</Typography>
      <Box mb={2}>
        <Typography variant="p">
          Gracias a ti vamos a mantener nuestra API actualizada, no lo olvides eres parte de esto.
        </Typography>
      </Box>
      {initValues && (
        <AddressesForm {...{ onSubmit: handleSubmit, catalogsPostalCode, catalogsSuburbsByPostalCode, initValues }} />
      )}
    </Box>
  )
}

export default AddressesEdit
