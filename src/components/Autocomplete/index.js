import * as React from "react"
import { Loader } from "@googlemaps/js-api-loader"
import { TextField } from "@mui/material"
import { GOOGLE_MAPS_API_KEY } from "../../constants"

const additionalOptions = { libraries: ["places"] }

const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: "weekly",
  ...additionalOptions,
})

const { useEffect } = React

const Autocomplete = ({ onChange }) => {
  useEffect(() => {
    loader.load().then(() => {
      const input = document.getElementById("autocomplete")
      const options = {
        componentRestrictions: { country: "mx" },
        fields: ["address_components", "geometry", "icon", "name"],
        strictBounds: false,
        types: ["route", "locality"],
      }
      const autocomplete = new google.maps.places.Autocomplete(input, options)
      autocomplete.addListener("place_changed", () => onChange(autocomplete))
    })
  }, [])

  return (
    <TextField
      id="autocomplete"
      data-testid="addressOptionField"
      label="Calle, número, municipio o alcaldía"
      placeholder="Ingresa calle, número, municipio o alcaldía"
      fullWidth
      margin={"normal"}
      InputLabelProps={{
        shrink: true,
      }}
    />
  )
}

export default Autocomplete
