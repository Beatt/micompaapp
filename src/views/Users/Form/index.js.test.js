import * as React from "react"
import { render, screen } from "@testing-library/react"
import UsersForm from "./index"
import { direccionByCP, coloniasByCP } from "../../../api/searchengines"
import { SnackbarProvider } from "notistack"
import UsersFormPage from "../../../../tests/pageobjects/UsersFormPage"

describe("UsersForm", function () {
  let props = {
    direccionByCP,
    coloniasByCP,
    usersSave: jest.fn(),
    initValues: undefined,
  }

  let createWrapper
  beforeEach(() => {
    jest.spyOn(props, "coloniasByCP").mockResolvedValue({
      data: ["Minerva", "Granjas Esmeralda", "Los Cipreses", "Progreso del Sur"],
    })

    jest.spyOn(props, "direccionByCP").mockResolvedValue({
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
          <UsersForm {...props} />
        </SnackbarProvider>
      )
  })

  it("create user when cp was found", async () => {
    createWrapper()

    UsersFormPage.fillCP("14030")
    await UsersFormPage.searchMyAddress()

    UsersFormPage.fillStreet("3a poniente 19")
    UsersFormPage.fillInteriorNumber("7")
    UsersFormPage.fillOutdoorNumber("18")
    UsersFormPage.fillSuburb("Los Cipreses")

    await UsersFormPage.submit()

    expect(props.usersSave).toBeCalledWith({
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

  it("create user when cp was not found", async () => {
    jest.spyOn(props, "direccionByCP").mockRejectedValue({})

    createWrapper()

    UsersFormPage.fillCP("14030")
    await UsersFormPage.searchMyAddress()

    UsersFormPage.fillStreet("3a poniente 19")
    UsersFormPage.fillInteriorNumber("7")
    UsersFormPage.fillOutdoorNumber("18")
    UsersFormPage.fillSuburb("Mi colonia")
    UsersFormPage.fillCity("CDMX")
    UsersFormPage.fillCountry("México")
    UsersFormPage.fillEstado("Ciudad de México")
    UsersFormPage.fillMunicipioAlcaldia("Tlalpan")

    await UsersFormPage.submit()

    expect(props.usersSave).toBeCalledWith({
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

  it("show error message when create user fail", async () => {
    jest.spyOn(props, "usersSave").mockRejectedValue()

    createWrapper()

    await UsersFormPage.fillRandomUser()

    await UsersFormPage.submit()

    expect(document.body.textContent).toEqual(
      expect.stringMatching("¡Lo sentimos, ha ocurrido un error al guardar tu dirección!")
    )
  })

  it("edit user", async () => {
    props.initValues = {
      cp: "14030",
      street: "3a poniente 19",
      interiorNumber: "7",
      outdoorNumber: "18",
      suburb: "Los Cipreses",
    }

    createWrapper()

    UsersFormPage.fillCP("14030")
    await UsersFormPage.searchMyAddress()

    UsersFormPage.fillStreet("6a poniente 20")

    await UsersFormPage.submit()

    expect(props.usersSave).toBeCalledWith({
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
