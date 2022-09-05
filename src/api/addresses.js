import axios from "axios"
import { API_URL, HEADER_JSON } from "./constans"

export const addressesCreate = (data) => axios.post(`${API_URL}/addresses`, JSON.stringify(data), HEADER_JSON)

export const addressesUpdate = (id, data) => axios.put(`${API_URL}/addresses/${id}`, JSON.stringify(data), HEADER_JSON)

export const addressesGetOne = (id) => axios.get(`${API_URL}/addresses/${id}`)

export const addressesGetMany = () => axios.get(`${API_URL}/addresses`)

export const addressesDelete = (id) => axios.delete(`${API_URL}/addresses/${id}`)
