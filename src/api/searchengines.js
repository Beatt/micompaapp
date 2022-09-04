export const searchEnginesCreate = () => Promise.resolve()

export const searchEnginesUpdate = () => Promise.resolve()

export const searchEnginesGetOne = () =>
  Promise.resolve({
    data: {
      id: "12310321",
      cp: "14030",
      municipioalcaldia: "Tlalpan",
      estado: "Ciudad de México",
      street: "3 poniente 19 7",
      suburb: "Isidro fabela",
      country: "México",
    },
  })

export const searchEnginesGetMany = () =>
  Promise.resolve({
    data: [
      {
        id: "12310321",
        cp: "14030",
        municipioalcaldia: "Tlalpan",
        estado: "Ciudad de México",
        street: "3 poniente 19 7",
        suburb: "Isidro fabela",
      },
    ],
  })

export const searchEnginesDelete = () => Promise.resolve()
