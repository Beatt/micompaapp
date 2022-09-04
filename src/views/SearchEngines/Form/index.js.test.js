import * as React from "react"
import { render, screen } from "@testing-library/react"
import SearchEnginesForm from "./index"
import { catalogsDireccionByCP, catalogsColoniasByCP } from "../../../api/catalogs"
import { SnackbarProvider } from "notistack"
import SearchEnginesFormPage from "../../../../tests/pageobjects/SearchEnginesFormPage"

describe("SearchEnginesForm", function () {
  let props = {
    catalogsDireccionByCP,
    catalogsColoniasByCP,
    searchEnginesSave: jest.fn(),
    initValues: undefined,
  }

  let createWrapper
  beforeEach(() => {
    jest.spyOn(props, "catalogsColoniasByCP").mockResolvedValue({
      data: ["Minerva", "Granjas Esmeralda", "Los Cipreses", "Progreso del Sur"],
    })

    jest.spyOn(props, "catalogsDireccionByCP").mockResolvedValue({
      data: {
        municipioalcaldia: "Tlalpan",
        estado: "Ciudad de México",
        pais: "México",
        city: "CDMX",
      },
    })

    createWrapper = () =>
      render(
        <SnackbarProvider>
          <SearchEnginesForm {...props} />
        </SnackbarProvider>
      )
  })

  it("create código postal when cp was found", async () => {
    createWrapper()

    SearchEnginesFormPage.fillCP("14030")
    await SearchEnginesFormPage.searchMyAddress()

    SearchEnginesFormPage.fillStreet("3a poniente 19")
    SearchEnginesFormPage.fillInteriorNumber("7")
    SearchEnginesFormPage.fillOutdoorNumber("18")
    SearchEnginesFormPage.fillSuburb("Los Cipreses")

    await SearchEnginesFormPage.submit()

    expect(props.searchEnginesSave).toBeCalledWith({
      cp: "14030",
      municipioalcaldia: "Tlalpan",
      estado: "Ciudad de México",
      pais: "México",
      street: "3a poniente 19",
      interiorNumber: "7",
      outdoorNumber: "18",
      suburb: "Los Cipreses",
      city: "CDMX",
    })
    expect(screen.getByTestId("pais").querySelector("input").disabled).toBeTruthy()
    expect(screen.getByTestId("estado").querySelector("input").disabled).toBeTruthy()
    expect(screen.getByTestId("municipioalcaldia").querySelector("input").disabled).toBeTruthy()
    expect(screen.getByTestId("city").querySelector("input").disabled).toBeTruthy()
    expect(document.body.textContent).toEqual(expect.stringMatching("¡Se ha guardado correctamente tu dirección!"))
  })

  it("create código postal when cp was not found", async () => {
    jest.spyOn(props, "catalogsDireccionByCP").mockRejectedValue({})

    createWrapper()

    SearchEnginesFormPage.fillCP("14030")
    await SearchEnginesFormPage.searchMyAddress()

    SearchEnginesFormPage.fillStreet("3a poniente 19")
    SearchEnginesFormPage.fillInteriorNumber("7")
    SearchEnginesFormPage.fillOutdoorNumber("18")
    SearchEnginesFormPage.fillSuburb("Mi colonia")
    SearchEnginesFormPage.fillCity("CDMX")
    SearchEnginesFormPage.fillCountry("México")
    SearchEnginesFormPage.fillEstado("Ciudad de México")
    SearchEnginesFormPage.fillMunicipioAlcaldia("Tlalpan")

    await SearchEnginesFormPage.submit()

    expect(props.searchEnginesSave).toBeCalledWith({
      cp: "14030",
      municipioalcaldia: "Tlalpan",
      estado: "Ciudad de México",
      pais: "México",
      street: "3a poniente 19",
      interiorNumber: "7",
      outdoorNumber: "18",
      suburb: "Mi colonia",
      city: "CDMX",
    })
    expect(screen.getByTestId("pais").querySelector("input").disabled).toBeFalsy()
    expect(screen.getByTestId("estado").querySelector("input").disabled).toBeFalsy()
    expect(screen.getByTestId("municipioalcaldia").querySelector("input").disabled).toBeFalsy()
    expect(screen.getByTestId("city").querySelector("input").disabled).toBeFalsy()
    expect(document.body.textContent).toEqual(expect.stringMatching("¡Se ha guardado correctamente tu dirección!"))
  })

  it("show error message when create código postal fail", async () => {
    jest.spyOn(props, "searchEnginesSave").mockRejectedValue()

    createWrapper()

    await SearchEnginesFormPage.fillRandomUser()

    await SearchEnginesFormPage.submit()

    expect(document.body.textContent).toEqual(
      expect.stringMatching("¡Lo sentimos, ha ocurrido un error al guardar tu dirección!")
    )
  })

  it("edit código postal", async () => {
    props.initValues = {
      cp: "14030",
      street: "3a poniente 19",
      interiorNumber: "7",
      outdoorNumber: "18",
      suburb: "Los Cipreses",
    }

    createWrapper()

    SearchEnginesFormPage.fillCP("14030")
    await SearchEnginesFormPage.searchMyAddress()

    SearchEnginesFormPage.fillStreet("6a poniente 20")

    await SearchEnginesFormPage.submit()

    expect(props.searchEnginesSave).toBeCalledWith({
      municipioalcaldia: "Tlalpan",
      estado: "Ciudad de México",
      pais: "México",
      cp: "14030",
      street: "6a poniente 20",
      interiorNumber: "7",
      outdoorNumber: "18",
      suburb: "Los Cipreses",
      city: "CDMX",
    })
  })
})
