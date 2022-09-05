import * as React from "react"
import { render, screen } from "@testing-library/react"
import AddressesForm from "./index"
import { catalogsPostalCode, catalogsSuburbsByPostalCode } from "../../../api/catalogs"
import { SnackbarProvider } from "notistack"
import AddressesFormPage from "../../../../tests/pageobjects/AddressesFormPage"

describe("AddressesForm", function () {
  let props = {
    catalogsPostalCode,
    catalogsSuburbsByPostalCode,
    onSubmit: jest.fn(),
    initValues: undefined,
  }

  let createWrapper
  beforeEach(() => {
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
        <SnackbarProvider>
          <AddressesForm {...props} />
        </SnackbarProvider>
      )
  })

  it("create address when cp was found", async () => {
    createWrapper()

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
    expect(screen.getByTestId("municipality").querySelector("input").disabled).toBeTruthy()
    expect(screen.getByTestId("city").querySelector("input").disabled).toBeTruthy()
    expect(document.body.textContent).toEqual(expect.stringMatching("¡Se ha guardado correctamente tu dirección!"))
  })

  it("create address when cp was not found", async () => {
    jest.spyOn(props, "catalogsPostalCode").mockRejectedValue({})

    createWrapper()

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
    jest.spyOn(props, "onSubmit").mockRejectedValue()

    createWrapper()

    await AddressesFormPage.fillRandomAddress()

    await AddressesFormPage.submit()

    expect(document.body.textContent).toEqual(
      expect.stringMatching("¡Lo sentimos, ha ocurrido un error al guardar tu dirección!")
    )
  })

  it("edit address", async () => {
    props.initValues = {
      cp: "14030",
      street: "3a poniente 19",
      interior_number: "7",
      outdoor_number: "18",
      suburb: "Los Cipreses",
    }

    createWrapper()

    AddressesFormPage.fillCP("14030")
    await AddressesFormPage.searchMyAddress()

    AddressesFormPage.fillStreet("6a poniente 20")

    await AddressesFormPage.submit()

    expect(props.onSubmit).toBeCalledWith({
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
