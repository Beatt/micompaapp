import * as React from "react"
import { Button, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, TextField } from "@mui/material"
import { useFormik } from "formik"
import { validationSchema } from "./validationSchema"
import { useSnackbar } from "notistack"
import Autocomplete from "../../../components/Autocomplete"
import { resolveAddressComponentToAddress } from "../../../helpers"
import { useNavigate } from "react-router-dom"

const ADDRESS_OPTION = "address"
const POSTAL_CODE_OPTION = "postalCode"
const POSTAL_CODE_LENGTH = 5

const { useState, useEffect } = React

const AddressesForm = ({ catalogsPostalCode, onSubmit, catalogsSuburbsByPostalCode, initValues }) => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [showInfo, setShowInfo] = useState(initValues !== undefined)
  const [colonias, setColonias] = useState([])
  const [optionSelected, setOptionSelected] = useState(null)
  const formik = useFormik({
    initialValues: {
      id: initValues?.id,
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
  const isEdit = initValues?.id !== undefined
  const [foundCP, setFoundCP] = useState(false)

  useEffect(() => {
    if (foundCP && formik.values.cp) {
      catalogsSuburbsByPostalCode(formik.values.cp)
        .then(({ data }) => setColonias(data))
        .catch(() => {})
    }
  }, [foundCP])

  async function handleSubmit(values) {
    try {
      await onSubmit({
        ...values,
      })
      enqueueSnackbar("¡Se ha guardado correctamente tu dirección!", { variant: "success" })
      navigate("/addresses")
    } catch ({ response }) {
      enqueueSnackbar(response?.data?.message ?? "¡Lo sentimos, ha ocurrido un error al guardar tu dirección!", {
        variant: "error",
      })
    }
  }

  async function getAddressByCp() {
    if (formik.values.cp.length === POSTAL_CODE_LENGTH) {
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
    } else {
      await formik.submitForm()
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

    if (suburbsZero()) {
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

  function handleAutocompleteChange(autocomplete) {
    const address = resolveAddressComponentToAddress(autocomplete.getPlace().address_components)
    formik.setValues({
      ...formik.values,
      ...address,
    })
    setShowInfo(true)
    setFoundCP(true)
  }

  function renderOptionSelected() {
    if (optionSelected === ADDRESS_OPTION) {
      return (
        <Grid item sm={12}>
          <Autocomplete onChange={handleAutocompleteChange} />
        </Grid>
      )
    } else if (optionSelected === POSTAL_CODE_OPTION) {
      return (
        <Grid item sm={12}>
          {renderPostalCode()}
          <Button type="button" size="large" variant="outlined" onClick={() => getAddressByCp()} disabled={isEdit}>
            Buscar mi dirección
          </Button>
        </Grid>
      )
    }
  }

  function renderPostalCode() {
    return (
      <TextField
        id="cp"
        label="Código postal"
        placeholder="Ingresa un código postal"
        data-testid="cp"
        value={formik.values.cp}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.cp && Boolean(formik.errors.cp)}
        helperText={formik.touched.cp && formik.errors.cp}
        fullWidth
        margin={"normal"}
        disabled={isEdit}
        InputLabelProps={{
          shrink: true,
        }}
      />
    )
  }

  function suburbsZero() {
    return colonias.length === 0
  }

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      {formik.values.id === undefined && (
        <Grid container>
          <Grid item sm={12}>
            <RadioGroup
              name="quiz"
              onChange={({ target }) => setOptionSelected(target.value)}
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <FormControlLabel
                data-testid="postalCodeOption"
                value={POSTAL_CODE_OPTION}
                control={<Radio />}
                label="Código postal"
              />
              <FormControlLabel
                data-testid="addressOption"
                value={ADDRESS_OPTION}
                control={<Radio />}
                label="Calle, número, municipio o alcaldía"
              />
            </RadioGroup>
          </Grid>
        </Grid>
      )}

      <Grid container>{renderOptionSelected()}</Grid>

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
            {optionSelected === ADDRESS_OPTION && suburbsZero() && (
              <Grid item sm={6}>
                {renderPostalCode()}
              </Grid>
            )}
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
