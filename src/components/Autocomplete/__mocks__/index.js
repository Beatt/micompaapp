import * as React from "react"
import { TextField } from "@mui/material"

const Autocomplete = ({ onChange }) => {
  return (
    <div>
      <TextField
        data-testid="addressOptionFieldWithoutPostalCode"
        onChange={() => {
          onChange({
            getPlace: () => {
              return {
                address_components: [
                  { long_name: "7", short_name: "7", types: ["street_number"] },
                  { long_name: "Calle 3 Poniente", short_name: "C. 3 Pte.", types: ["route"] },
                  {
                    long_name: "Isidro Fabela",
                    short_name: "Isidro Fabela",
                    types: ["sublocality_level_1", "sublocality", "political"],
                  },
                  { long_name: "Ciudad de México", short_name: "México D.F.", types: ["locality", "political"] },
                  {
                    long_name: "Ciudad de México",
                    short_name: "CDMX",
                    types: ["administrative_area_level_1", "political"],
                  },
                  { long_name: "México", short_name: "MX", types: ["country", "political"] },
                ],
                geometry: {
                  location: { lat: 19.3027701, lng: -99.176558 },
                  viewport: {
                    south: 19.3014211197085,
                    west: -99.17790698029151,
                    north: 19.3041190802915,
                    east: -99.1752090197085,
                  },
                },
                icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png",
                name: "C. 3 Pte. 7",
                html_attributions: [],
              }
            },
          })
        }}
      >
        SIN POSTAL CODE
      </TextField>
      <TextField
        data-testid="addressOptionField"
        onChange={() => {
          onChange({
            getPlace: () => {
              return {
                address_components: [
                  { long_name: "7", short_name: "7", types: ["street_number"] },
                  { long_name: "Calle 3 Poniente", short_name: "C. 3 Pte.", types: ["route"] },
                  {
                    long_name: "Isidro Fabela",
                    short_name: "Isidro Fabela",
                    types: ["sublocality_level_1", "sublocality", "political"],
                  },
                  { long_name: "Ciudad de México", short_name: "México D.F.", types: ["locality", "political"] },
                  {
                    long_name: "Ciudad de México",
                    short_name: "CDMX",
                    types: ["administrative_area_level_1", "political"],
                  },
                  { long_name: "México", short_name: "MX", types: ["country", "political"] },
                  { long_name: "14030", short_name: "14030", types: ["postal_code"] },
                ],
                geometry: {
                  location: { lat: 19.3027701, lng: -99.176558 },
                  viewport: {
                    south: 19.3014211197085,
                    west: -99.17790698029151,
                    north: 19.3041190802915,
                    east: -99.1752090197085,
                  },
                },
                icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png",
                name: "C. 3 Pte. 7",
                html_attributions: [],
              }
            },
          })
        }}
      >
        TEST
      </TextField>
    </div>
  )
}

export default Autocomplete
