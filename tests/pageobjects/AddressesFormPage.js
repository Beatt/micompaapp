import { act } from "react-dom/test-utils"
import { fireEvent, screen, waitFor } from "@testing-library/react"
import addresses from "../factories/addresses"

class AddressesFormPage {
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
    fireEvent.change(screen.getByTestId("country").querySelector("input"), { target: { value } })
  }

  static fillEstado(value) {
    fireEvent.change(screen.getByTestId("state").querySelector("input"), { target: { value } })
  }

  static fillMunicipioAlcaldia(value) {
    fireEvent.change(screen.getByTestId("municipality").querySelector("input"), { target: { value } })
  }

  static selectPostalCodeOption() {
    fireEvent.click(screen.getByTestId("postalCodeOption").querySelector("input"))
  }

  static selectAddressOption() {
    fireEvent.click(screen.getByTestId("addressOption").querySelector("input"))
  }

  static async fillAddressOptionField(value) {
    await waitFor(() => {
      fireEvent.change(screen.getByTestId("addressOptionField").querySelector("input"), { target: { value } })
    })
  }

  static async fillAddressOptionFieldWithoutPostalCode(value) {
    await waitFor(() => {
      fireEvent.change(screen.getByTestId("addressOptionFieldWithoutPostalCode").querySelector("input"), {
        target: { value },
      })
    })
  }

  static async searchMyAddress() {
    await act(() => {
      fireEvent.click(screen.getByText("Buscar mi direcci??n"))
    })
  }

  static async submit() {
    await act(() => {
      fireEvent.submit(screen.getByText("Guardar mi direcci??n"))
    })
  }

  static async fillRandomAddress() {
    const address = addresses.build()

    AddressesFormPage.selectPostalCodeOption()
    AddressesFormPage.fillCP(address.cp)
    await AddressesFormPage.searchMyAddress()

    AddressesFormPage.fillStreet(address.street)
    AddressesFormPage.fillInteriorNumber(address.interior_number)
    AddressesFormPage.fillOutdoorNumber(address.outdoor_number)
    AddressesFormPage.fillSuburb(address.suburb)
  }
}

export default AddressesFormPage
