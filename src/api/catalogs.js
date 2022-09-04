export const catalogsDireccionByCP = () =>
  Promise.resolve({
    data: {
      municipioalcaldia: "Tlalpan",
      estado: "Ciudad de México",
      pais: "México",
      city: "Ciudad de México",
    },
  })

export const catalogsColoniasByCP = () =>
  Promise.resolve({
    data: ["Minerva", "Granjas Esmeralda", "Los Cipreses", "Progreso del Sur"],
  })
