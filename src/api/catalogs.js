import axios from "axios"
import { API_URL } from "./constans"

export const catalogsPostalCode = (postalCode) => axios.get(`${API_URL}/catalogs/postal_code?postal_code=${postalCode}`)

export const catalogsSuburbsByPostalCode = (postalCode) =>
  axios.get(`${API_URL}/catalogs/suburbs?postal_code=${postalCode}`)
