import Users from "./index"
import { act } from "react-dom/test-utils"
import { fireEvent, render, screen } from "@testing-library/react"
import * as usersApi from "../../api/users"
import { SnackbarProvider } from "notistack"
import { BrowserRouter } from "react-router-dom"

describe("Users", function () {
  let createWrapper
  beforeEach(() => {
    jest.spyOn(usersApi, "usersGetMany").mockResolvedValue({
      data: [
        {
          id: "1",
          user: "Gabriel",
          cp: "14030",
          municipioalcaldia: "Tlalpan",
          estado: "Ciudad de México",
          street: "3 poniente 19 7",
          suburb: "Isidro fabela",
        },
      ],
    })

    jest.spyOn(usersApi, "usersDelete").mockResolvedValue()

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

  it("list users", async () => {
    await createWrapper()

    expect(document.querySelectorAll("tbody tr")).toHaveLength(1)
    expect(document.querySelectorAll("tbody tr td")).toHaveLength(7)
  })

  it("delete user", async () => {
    await createWrapper()

    await act(() => {
      fireEvent.click(screen.getByTestId("delete"))
    })

    expect(document.body.textContent).toEqual(expect.stringMatching("¡Se ha eliminado correctamente el código postal!"))
  })

  it("edit user", async () => {
    await createWrapper()

    await act(() => {
      fireEvent.click(screen.getByTestId("edit"))
    })

    expect(window.location.href).toEqual(expect.stringMatching(`users/1`))
  })
})
