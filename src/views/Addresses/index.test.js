import Users from "./index"
import { act } from "react-dom/test-utils"
import { fireEvent, render, screen } from "@testing-library/react"
import * as api from "../../api/addresses"
import { SnackbarProvider } from "notistack"
import { BrowserRouter } from "react-router-dom"

describe("Addresses", function () {
  let createWrapper
  beforeEach(() => {
    jest.spyOn(api, "addressesGetMany").mockResolvedValue({
      data: [
        {
          id: "1",
          user: "Gabriel",
          cp: "14030",
          municipality: "Tlalpan",
          state: "Ciudad de México",
          street: "3 poniente 19 7",
          suburb: "Isidro fabela",
        },
      ],
    })

    jest.spyOn(api, "addressesDelete").mockResolvedValue()

    createWrapper = async () => {
      let wrapper
      await act(async () => {
        wrapper = await render(
          <BrowserRouter>
            <SnackbarProvider>
              <Users />
            </SnackbarProvider>
          </BrowserRouter>
        )
      })

      return wrapper
    }
  })

  it("list addresses", async () => {
    await createWrapper()

    expect(document.querySelectorAll("tbody tr")).toHaveLength(1)
    expect(document.querySelectorAll("tbody tr td")).toHaveLength(6)
  })

  it("delete address", async () => {
    await createWrapper()

    await act(() => {
      fireEvent.click(screen.getByTestId("delete"))
    })

    expect(document.body.textContent).toEqual(expect.stringMatching("¡Se ha eliminado correctamente la dirección!"))
  })

  it("edit address", async () => {
    await createWrapper()

    await act(() => {
      fireEvent.click(screen.getByTestId("edit"))
    })

    expect(window.location.href).toEqual(expect.stringMatching(`addresses/1/edit`))
  })

  it("show address", async () => {
    await createWrapper()

    await act(() => {
      fireEvent.click(screen.getByTestId("details"))
    })

    expect(window.location.href).toEqual(expect.stringMatching(`addresses/1`))
  })
})
