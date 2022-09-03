import * as React from "react"
import { render, screen } from "@testing-library/react"
import UsersForm from "./index"
import { addressGet } from "../../../api/address"
import { SnackbarProvider } from "notistack"
import UsersFormPage from "../../../../tests/pageobjects/UsersFormPage"

describe("UsersForm", function () {
  let props = {
    addressGet,
    usersSave: jest.fn(),
  }

  let createWrapper
  beforeEach(() => {
    createWrapper = () =>
      render(
        <SnackbarProvider>
          <UsersForm {...props} />
        </SnackbarProvider>
      )
  })

  it("create user when cp was found", async () => {
    jest.spyOn(props, "addressGet").mockResolvedValue({
      data: {
        municipioalcaldia: "Tlalpan",
        estado: "Ciudad de México",
        pais: "México",
      },
    })

    createWrapper()

    UsersFormPage.fillCP("14030")
    await UsersFormPage.searchMyAddress()

    UsersFormPage.fillStreet("3a poniente 19")
    UsersFormPage.fillInteriorNumber("7")
    UsersFormPage.fillOutdoorNumber("18")
    UsersFormPage.fillSuburb("SN")
    UsersFormPage.fillCity("CDMX")

    await UsersFormPage.submit()

    expect(props.usersSave).toBeCalledWith({
      cp: "14030",
      municipioalcaldia: "Tlalpan",
      estado: "Ciudad de México",
      pais: "México",
      street: "3a poniente 19",
      interiorNumber: "7",
      outdoorNumber: "18",
      suburb: "SN",
      city: "CDMX",
    })
    expect(screen.getByTestId("pais").querySelector("input").disabled).toBeTruthy()
    expect(screen.getByTestId("estado").querySelector("input").disabled).toBeTruthy()
    expect(screen.getByTestId("municipioalcaldia").querySelector("input").disabled).toBeTruthy()
  })

  it("create user when cp was not found", async () => {
    jest.spyOn(props, "addressGet").mockRejectedValue({})

    createWrapper()

    UsersFormPage.fillCP("14030")
    await UsersFormPage.searchMyAddress()

    UsersFormPage.fillStreet("3a poniente 19")
    UsersFormPage.fillInteriorNumber("7")
    UsersFormPage.fillOutdoorNumber("18")
    UsersFormPage.fillSuburb("SN")
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
      suburb: "SN",
      city: "CDMX",
    })
    expect(screen.getByTestId("pais").querySelector("input").disabled).toBeFalsy()
    expect(screen.getByTestId("estado").querySelector("input").disabled).toBeFalsy()
    expect(screen.getByTestId("municipioalcaldia").querySelector("input").disabled).toBeFalsy()
  })
})
