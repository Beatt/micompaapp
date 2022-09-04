import { act } from "react-dom/test-utils"
import { fireEvent, screen } from "@testing-library/react"
import searchEngines from "../factories/searchEngines"

class SearchEnginesFormPage {
  static fillCP(value) {
    fireEvent.change(screen.getByTestId("cp").querySelector("input"), { target: { value } })
  }

  static fillStreet(value) {
    fireEvent.change(screen.getByTestId("street").querySelector("input"), { target: { value } })
  }

  static fillInteriorNumber(value) {
    fireEvent.change(screen.getByTestId("interiorNumber").querySelector("input"), { target: { value } })
  }

  static fillOutdoorNumber(value) {
    fireEvent.change(screen.getByTestId("outdoorNumber").querySelector("input"), { target: { value } })
  }

  static fillSuburb(value) {
    fireEvent.change(screen.getByTestId("suburb").querySelector("input"), { target: { value } })
  }

  static fillCity(value) {
    fireEvent.change(screen.getByTestId("city").querySelector("input"), { target: { value } })
  }

  static fillCountry(value) {
    fireEvent.change(screen.getByTestId("pais").querySelector("input"), { target: { value } })
  }

  static fillEstado(value) {
    fireEvent.change(screen.getByTestId("estado").querySelector("input"), { target: { value } })
  }

  static fillMunicipioAlcaldia(value) {
    fireEvent.change(screen.getByTestId("municipioalcaldia").querySelector("input"), { target: { value } })
  }

  static async searchMyAddress() {
    await act(() => {
      fireEvent.click(screen.getByText("Buscar mi dirección"))
    })
  }

  static async submit() {
    await act(() => {
      fireEvent.submit(screen.getByText("Guardar mi dirección"))
    })
  }

  static async fillRandomUser() {
    const searchEngine = searchEngines.build()

    SearchEnginesFormPage.fillCP(searchEngine.cp)
    await SearchEnginesFormPage.searchMyAddress()

    SearchEnginesFormPage.fillStreet(searchEngine.street)
    SearchEnginesFormPage.fillInteriorNumber(searchEngine.interiorNumber)
    SearchEnginesFormPage.fillOutdoorNumber(searchEngine.outdoorNumber)
    SearchEnginesFormPage.fillSuburb(searchEngine.suburb)
  }
}

export default SearchEnginesFormPage
