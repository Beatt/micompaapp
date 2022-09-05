import axios from "axios"

export const catalogsPostalCode = (postalCode) =>
  axios.get(`http://localhost:3000/api/v1/catalogs/postal_code?postal_code=${postalCode}`)

export const catalogsSuburbsByPostalCode = (postalCode) =>
  axios.get(`http://localhost:3000/api/v1/catalogs/suburbs?postal_code=${postalCode}`)
