export const usersCreate = () => Promise.resolve()

export const usersUpdate = () => Promise.resolve()

export const usersGetOne = () =>
  Promise.resolve({
    data: {
      id: "12310321",
      user: "Gabriel",
      cp: "14030",
      municipioalcaldia: "Tlalpan",
      estado: "Ciudad de México",
      street: "3 poniente 19 7",
      suburb: "Isidro fabela",
    },
  })

export const usersGetMany = () =>
  Promise.resolve({
    data: [
      {
        id: "12310321",
        user: "Gabriel",
        cp: "14030",
        municipioalcaldia: "Tlalpan",
        estado: "Ciudad de México",
        street: "3 poniente 19 7",
        suburb: "Isidro fabela",
      },
    ],
  })

export const usersDelete = () => Promise.resolve()
