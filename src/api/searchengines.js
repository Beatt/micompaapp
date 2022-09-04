export const direccionByCP = () =>
  Promise.resolve({
    data: {
      municipioalcaldia: "Tlalpan",
      estado: "Ciudad de México",
      pais: "México",
      city: "Ciudad de México",
    },
  })

export const coloniasByCP = () =>
  Promise.resolve({
    data: ["Minerva", "Granjas Esmeralda", "Los Cipreses", "Progreso del Sur"],
  })
