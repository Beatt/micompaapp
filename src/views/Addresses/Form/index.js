import * as React from "react"
import { Button, Grid, MenuItem, TextField } from "@mui/material"
import { useFormik } from "formik"
import { validationSchema } from "./validationSchema"
import { useSnackbar } from "notistack"

const { useState, useEffect } = React

const AddressesForm = ({ catalogsPostalCode, onSubmit, catalogsSuburbsByPostalCode, initValues }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [showInfo, setShowInfo] = useState(initValues !== undefined)
  const [colonias, setColonias] = useState([])
  const formik = useFormik({
    initialValues: {
      cp: initValues?.cp ?? "",
      municipality: initValues?.municipality ?? "",
      state: initValues?.state ?? "",
      country: initValues?.country ?? "",
      street: initValues?.street ?? "",
      interior_number: initValues?.interior_number ?? "",
      outdoor_number: initValues?.outdoor_number ?? "",
      suburb: initValues?.suburb ?? "",
      city: initValues?.city ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  })
  const [foundCP, setFoundCP] = useState(false)

  useEffect(() => {
    if (foundCP) {
      catalogsSuburbsByPostalCode(formik.values.cp).then(({ data }) => setColonias(data))
    }
  }, [foundCP])

  async function handleSubmit(values) {
    try {
      await onSubmit({
        ...values,
      })
      enqueueSnackbar("¡Se ha guardado correctamente tu dirección!", { variant: "success" })
    } catch {
      enqueueSnackbar("¡Lo sentimos, ha ocurrido un error al guardar tu dirección!", { variant: "error" })
    }
  }

  async function getAddressByCp() {
    if (!formik.values.cp) {
      await formik.submitForm()
    } else {
      try {
        const { data } = await catalogsPostalCode(formik.values.cp)
        formik.setValues({
          ...formik.values,
          municipality: data.municipality,
          state: data.state,
          country: data.country,
          city: data.city,
        })
        setFoundCP(true)
      } catch {
        enqueueSnackbar("¡Lo sentimos, no hemos encontrado tu código postal, ingresa cada uno de los campos!", {
          variant: "warning",
        })
      } finally {
        setShowInfo(true)
      }
    }
  }

  function renderColoniaField() {
    const coloniaProps = {
      id: "suburb",
      label: "Colonia",
      value: formik.values.suburb,
      onChange: formik.handleChange,
      error: formik.touched.suburb && Boolean(formik.errors.suburb),
      helperText: formik.touched.suburb && formik.errors.suburb,
      fullWidth: true,
      margin: "normal",
    }

    if (colonias.length === 0) {
      return <TextField {...coloniaProps} data-testid="suburb" />
    } else {
      return (
        <TextField name="suburb" {...coloniaProps} data-testid="suburb" select>
          <MenuItem value="">Selecciona una opción</MenuItem>
          {colonias.map(({ name }, index) => (
            <MenuItem key={index} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>
      )
    }
  }

  const isEdit = initValues?.id !== undefined

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container>
        <Grid item sm={12}>
          <TextField
            id="cp"
            label="Código postal"
            data-testid="cp"
            value={formik.values.cp}
            onChange={formik.handleChange}
            error={formik.touched.cp && Boolean(formik.errors.cp)}
            helperText={formik.touched.cp && formik.errors.cp}
            fullWidth
            margin={"normal"}
            disabled={isEdit}
          />
          <Button type="button" size="large" variant="outlined" onClick={() => getAddressByCp()} disabled={isEdit}>
            Buscar mi dirección
          </Button>
        </Grid>
      </Grid>
      {showInfo && (
        <>
          <Grid container>
            <Grid item sm={6}>
              <TextField
                id="street"
                label="Calle"
                data-testid="street"
                value={formik.values.street}
                onChange={formik.handleChange}
                error={formik.touched.street && Boolean(formik.errors.street)}
                helperText={formik.touched.street && formik.errors.street}
                fullWidth
                margin={"normal"}
              />
            </Grid>
            <Grid item sm={3}>
              <TextField
                id="outdoor_number"
                label="N. Exterior"
                data-testid="outdoorNumber"
                value={formik.values.outdoor_number}
                onChange={formik.handleChange}
                error={formik.touched.outdoor_number && Boolean(formik.errors.outdoor_number)}
                helperText={formik.touched.outdoor_number && formik.errors.outdoor_number}
                fullWidth
                margin={"normal"}
              />
            </Grid>
            <Grid item sm={3}>
              <TextField
                id="interior_number"
                label="N. Interior (optativo)"
                data-testid="interiorNumber"
                value={formik.values.interior_number}
                onChange={formik.handleChange}
                error={formik.touched.interior_number && Boolean(formik.errors.interior_number)}
                helperText={formik.touched.interior_number && formik.errors.interior_number}
                fullWidth
                margin={"normal"}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={6}>
              <TextField
                id="municipality"
                label="Municipio/Alcaldía"
                data-testid="municipality"
                value={formik.values.municipality}
                onChange={formik.handleChange}
                error={formik.touched.municipality && Boolean(formik.errors.municipality)}
                helperText={formik.touched.municipality && formik.errors.municipality}
                fullWidth
                margin={"normal"}
                disabled={foundCP}
              />
            </Grid>
            <Grid item sm={6}>
              {renderColoniaField()}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={6}>
              <TextField
                id="country"
                label="Pais"
                data-testid="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
                fullWidth
                margin={"normal"}
                disabled={foundCP}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                id="state"
                label="Estado"
                data-testid="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
                fullWidth
                margin={"normal"}
                disabled={foundCP}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={6}>
              <TextField
                id="city"
                label="Ciudad (optativo)"
                data-testid="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                fullWidth
                margin={"normal"}
                disabled={foundCP}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={12} textAlign="right">
              <Button type="submit" variant="contained" color="success" size="large">
                Guardar mi dirección
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </form>
  )
}

export default AddressesForm
