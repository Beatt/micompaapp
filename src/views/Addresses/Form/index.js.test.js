import * as React from "react"
import { render, screen } from "@testing-library/react"
import AddressesForm from "./index"
import { catalogsPostalCode, catalogsSuburbsByPostalCode } from "../../../api/catalogs"
import { SnackbarProvider } from "notistack"
import AddressesFormPage from "../../../../tests/pageobjects/AddressesFormPage"
import { BrowserRouter } from "react-router-dom"

jest.mock("../../../components/Autocomplete")

describe("AddressesForm", function () {
  let props

  let createWrapper
  beforeEach(() => {
    props = {
      catalogsPostalCode,
      catalogsSuburbsByPostalCode,
      onSubmit: jest.fn(),
      initValues: undefined,
    }

    jest.spyOn(props, "catalogsSuburbsByPostalCode").mockResolvedValue({
      data: [
        { name: "Minerva" },
        { name: "Granjas Esmeralda" },
        { name: "Los Cipreses" },
        { name: "Progreso del Sur" },
      ],
    })

    jest.spyOn(props, "catalogsPostalCode").mockResolvedValue({
      data: {
        municipality: "Tlalpan",
        state: "Ciudad de México",
        country: "México",
        city: "CDMX",
      },
    })

    createWrapper = () =>
      render(
        <BrowserRouter>
          <SnackbarProvider>
            <AddressesForm {...props} />
          </SnackbarProvider>
        </BrowserRouter>
      )
  })

  describe("when postal code option is selected", function () {
    it("create address when cp was found", async () => {
      createWrapper()

      AddressesFormPage.selectPostalCodeOption()
      AddressesFormPage.fillCP("14030")
      await AddressesFormPage.searchMyAddress()

      AddressesFormPage.fillStreet("3a poniente 19")
      AddressesFormPage.fillInteriorNumber("7")
      AddressesFormPage.fillOutdoorNumber("18")
      AddressesFormPage.fillSuburb("Los Cipreses")

      await AddressesFormPage.submit()

      expect(props.onSubmit).toBeCalledWith({
        cp: "14030",
        municipality: "Tlalpan",
        state: "Ciudad de México",
        country: "México",
        street: "3a poniente 19",
        interior_number: "7",
        outdoor_number: "18",
        suburb: "Los Cipreses",
        city: "CDMX",
      })
      expect(screen.getByTestId("country").querySelector("input").disabled).toBeTruthy()
      expect(screen.getByTestId("state").querySelector("input").disabled).toBeTruthy()
      expect(screen.getByTestId("city").querySelector("input").disabled).toBeTruthy()
      expect(document.body.textContent).toEqual(expect.stringMatching("¡Se ha guardado correctamente tu dirección!"))
      expect(window.location.href).toEqual(expect.stringMatching("/addresses"))
    })

    it("create address when cp was not found", async () => {
      jest.spyOn(props, "catalogsPostalCode").mockRejectedValue({})

      createWrapper()

      AddressesFormPage.selectPostalCodeOption()
      AddressesFormPage.fillCP("14030")
      await AddressesFormPage.searchMyAddress()

      AddressesFormPage.fillStreet("3a poniente 19")
      AddressesFormPage.fillInteriorNumber("7")
      AddressesFormPage.fillOutdoorNumber("18")
      AddressesFormPage.fillSuburb("Mi colonia")
      AddressesFormPage.fillCity("CDMX")
      AddressesFormPage.fillCountry("México")
      AddressesFormPage.fillEstado("Ciudad de México")
      AddressesFormPage.fillMunicipioAlcaldia("Tlalpan")

      await AddressesFormPage.submit()

      expect(props.onSubmit).toBeCalledWith({
        cp: "14030",
        municipality: "Tlalpan",
        state: "Ciudad de México",
        country: "México",
        street: "3a poniente 19",
        interior_number: "7",
        outdoor_number: "18",
        suburb: "Mi colonia",
        city: "CDMX",
      })
      expect(screen.getByTestId("country").querySelector("input").disabled).toBeFalsy()
      expect(screen.getByTestId("state").querySelector("input").disabled).toBeFalsy()
      expect(screen.getByTestId("municipality").querySelector("input").disabled).toBeFalsy()
      expect(screen.getByTestId("city").querySelector("input").disabled).toBeFalsy()
      expect(document.body.textContent).toEqual(expect.stringMatching("¡Se ha guardado correctamente tu dirección!"))
    })

    it("show error message when create address fail", async () => {
      jest
        .spyOn(props, "onSubmit")
        .mockRejectedValue({ response: { data: { message: "¡El código postal ya existe!" } } })

      createWrapper()

      await AddressesFormPage.fillRandomAddress()

      await AddressesFormPage.submit()

      expect(document.body.textContent).toEqual(expect.stringMatching("¡El código postal ya existe!"))
    })

    it("edit address", async () => {
      props.initValues = {
        id: 1,
        cp: "14030",
        street: "3a poniente 19",
        interior_number: "7",
        outdoor_number: "18",
        suburb: "Los Cipreses",
        country: "México",
        state: "Ciudad de México",
        city: "CDMX",
        municipality: "Coyoacan",
      }

      createWrapper()

      AddressesFormPage.fillStreet("6a poniente 20")
      AddressesFormPage.fillMunicipioAlcaldia("Tlalpan")

      await AddressesFormPage.submit()

      expect(screen.queryByTestId("addressOption")).toBeNull()
      expect(screen.queryByTestId("postalCodeOption")).toBeNull()
      expect(props.onSubmit).toBeCalledWith({
        id: 1,
        municipality: "Tlalpan",
        state: "Ciudad de México",
        country: "México",
        cp: "14030",
        street: "6a poniente 20",
        interior_number: "7",
        outdoor_number: "18",
        suburb: "Los Cipreses",
        city: "CDMX",
      })
    })
  })

  describe("when address option is selected", function () {
    it("create address if the autocomplete is ok", async () => {
      createWrapper()

      AddressesFormPage.selectAddressOption()
      await AddressesFormPage.fillAddressOptionField("3a poniente")

      AddressesFormPage.fillMunicipioAlcaldia("Ciudad de México")
      AddressesFormPage.fillSuburb("Los Cipreses")

      await AddressesFormPage.submit()

      expect(props.onSubmit).toBeCalledWith({
        cp: "14030",
        municipality: "Ciudad de México",
        state: "Ciudad de México",
        country: "México",
        street: "Calle 3 Poniente",
        interior_number: "",
        outdoor_number: "7",
        suburb: "Los Cipreses",
        city: "Ciudad de México",
      })

      expect(document.body.textContent).toEqual(expect.stringMatching("¡Se ha guardado correctamente tu dirección!"))
    })

    it("create address if the postal code not exist", async () => {
      createWrapper()

      AddressesFormPage.selectAddressOption()
      await AddressesFormPage.fillAddressOptionFieldWithoutPostalCode("3a poniente")

      AddressesFormPage.fillMunicipioAlcaldia("Ciudad de México")
      AddressesFormPage.fillSuburb("Isidro fabela")
      AddressesFormPage.fillCP("14030")

      await AddressesFormPage.submit()

      expect(props.onSubmit).toBeCalledWith({
        cp: "14030",
        municipality: "Ciudad de México",
        state: "Ciudad de México",
        country: "México",
        street: "Calle 3 Poniente",
        interior_number: "",
        outdoor_number: "7",
        suburb: "Isidro fabela",
        city: "Ciudad de México",
      })

      expect(document.body.textContent).toEqual(expect.stringMatching("¡Se ha guardado correctamente tu dirección!"))
    })
  })
})
