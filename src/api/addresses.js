import axios from "axios"

const HEADERS = {
  headers: {
    "Content-Type": "application/json",
  },
}

export const addressesCreate = (data) =>
  axios.post("http://localhost:3000/api/v1/addresses", JSON.stringify(data), HEADERS)

export const addressesUpdate = (id, data) =>
  axios.put(`http://localhost:3000/api/v1/addresses/${id}`, JSON.stringify(data), HEADERS)

export const addressesGetOne = (id) => axios.get(`http://localhost:3000/api/v1/addresses/${id}`)

export const addressesGetMany = () => axios.get("http://localhost:3000/api/v1/addresses")

export const addressesDelete = (id) => axios.delete(`http://localhost:3000/api/v1/addresses/${id}`)
