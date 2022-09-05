import * as React from "react"
import AddressesForm from "../Form"
import { catalogsPostalCode, catalogsSuburbsByPostalCode } from "../../../api/catalogs"
import { addressesCreate } from "../../../api/addresses"

const AddressesCreate = () => {
  return <AddressesForm {...{ onSubmit: addressesCreate, catalogsPostalCode, catalogsSuburbsByPostalCode }} />
}

export default AddressesCreate
