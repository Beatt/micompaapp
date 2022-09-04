import * as React from "react"
import SearchEnginesForm from "../Form"
import { searchEnginesGetOne, searchEnginesUpdate } from "../../../api/searchengines"
import { catalogsDireccionByCP, catalogsColoniasByCP } from "../../../api/catalogs"
import { Box, Typography } from "@mui/material"
import { useSearchParams } from "react-router-dom"

const { useState, useEffect } = React

const SearchEnginesEdit = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")

  const [initValues, setInitialValues] = useState(null)

  useEffect(() => {
    searchEnginesGetOne({ id }).then(({ data }) => {
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
      {initValues && (
        <SearchEnginesForm
          {...{ searchEnginesSave: searchEnginesUpdate, catalogsDireccionByCP, catalogsColoniasByCP, initValues }}
        />
      )}
    </Box>
  )
}

export default SearchEnginesEdit
