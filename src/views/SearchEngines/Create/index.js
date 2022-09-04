import * as React from "react"
import SearchEnginesForm from "../Form"
import { catalogsDireccionByCP, catalogsColoniasByCP } from "../../../api/catalogs"
import { searchEnginesCreate } from "../../../api/searchengines"

const SearchEnginesCreate = () => {
  return (
    <SearchEnginesForm {...{ searchEnginesSave: searchEnginesCreate, catalogsDireccionByCP, catalogsColoniasByCP }} />
  )
}

export default SearchEnginesCreate
