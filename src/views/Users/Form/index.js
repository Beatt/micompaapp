import * as React from "react"
import { Button, Grid, MenuItem, TextField } from "@mui/material"
import { useFormik } from "formik"
import { validationSchema } from "./validationSchema"
import { useSnackbar } from "notistack"

const { useState, useEffect } = React

const UsersForm = ({ direccionByCP, usersSave, coloniasByCP }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [showInfo, setShowInfo] = useState(false)
  const [colonias, setColonias] = useState([])
  const formik = useFormik({
    initialValues: {
      cp: "",
      municipioalcaldia: "",
      estado: "",
      pais: "",
      street: "",
      interiorNumber: "",
      outdoorNumber: "",
      suburb: "",
      city: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  })
  const [foundCP, setFoundCP] = useState(false)

  useEffect(() => {
    if (foundCP) {
      coloniasByCP(formik.values.cp).then(({ data }) => setColonias(data))
    }
  }, [foundCP])

  async function handleSubmit(values) {
    try {
      await usersSave({
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
        const { data } = await direccionByCP(formik.values.cp)
        formik.setValues({
          ...formik.values,
          municipioalcaldia: data.municipioalcaldia,
          estado: data.estado,
          pais: data.pais,
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
      return (
        <TextField
          id="suburb"
          label="Colonia"
          data-testid="suburb"
          value={formik.values.suburb}
          onChange={formik.handleChange}
          error={formik.touched.suburb && Boolean(formik.errors.suburb)}
          helperText={formik.touched.suburb && formik.errors.suburb}
          fullWidth
          margin={"normal"}
        />
      )
    } else {
      return (
        <TextField name="suburb" {...coloniaProps} data-testid="suburb" select>
          <MenuItem value="">Selecciona una opción</MenuItem>
          {colonias.map((colonia, index) => (
            <MenuItem key={index} value={colonia}>
              {colonia}
            </MenuItem>
          ))}
        </TextField>
      )
    }
  }

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
          />
          <Button type="button" size="large" variant="outlined" onClick={() => getAddressByCp()}>
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
                id="outdoorNumber"
                label="N. Exterior"
                data-testid="outdoorNumber"
                value={formik.values.outdoorNumber}
                onChange={formik.handleChange}
                error={formik.touched.outdoorNumber && Boolean(formik.errors.outdoorNumber)}
                helperText={formik.touched.outdoorNumber && formik.errors.outdoorNumber}
                fullWidth
                margin={"normal"}
              />
            </Grid>
            <Grid item sm={3}>
              <TextField
                id="interiorNumber"
                label="N. Interior (optativo)"
                data-testid="interiorNumber"
                value={formik.values.interiorNumber}
                onChange={formik.handleChange}
                error={formik.touched.interiorNumber && Boolean(formik.errors.interiorNumber)}
                helperText={formik.touched.interiorNumber && formik.errors.interiorNumber}
                fullWidth
                margin={"normal"}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={6}>
              <TextField
                id="municipioalcaldia"
                label="Municipio/Alcaldía"
                data-testid="municipioalcaldia"
                value={formik.values.municipioalcaldia}
                onChange={formik.handleChange}
                error={formik.touched.municipioalcaldia && Boolean(formik.errors.municipioalcaldia)}
                helperText={formik.touched.municipioalcaldia && formik.errors.municipioalcaldia}
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
                id="pais"
                label="Pais"
                data-testid="pais"
                value={formik.values.pais}
                onChange={formik.handleChange}
                error={formik.touched.pais && Boolean(formik.errors.pais)}
                helperText={formik.touched.pais && formik.errors.pais}
                fullWidth
                margin={"normal"}
                disabled={foundCP}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                id="estado"
                label="Estado"
                data-testid="estado"
                value={formik.values.estado}
                onChange={formik.handleChange}
                error={formik.touched.estado && Boolean(formik.errors.estado)}
                helperText={formik.touched.estado && formik.errors.estado}
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

export default UsersForm
