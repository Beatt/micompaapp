import * as yup from "yup"

export const validationSchema = yup.object({
  cp: yup.string("Ingresa tu código postal").required("Campo obligatorio"),
  street: yup.string("Ingresa tu calle").required("Campo obligatorio"),
  outdoorNumber: yup.string("Ingresa tu n. exterior").required("Campo obligatorio"),
  municipioalcaldia: yup.string("Ingresa tu municipio/alcaldía").required("Campo obligatorio"),
  estado: yup.string("Ingresa tu estado").required("Campo obligatorio"),
  pais: yup.string("Ingresa tu pais").required("Campo obligatorio"),
  suburb: yup.string("Ingresa tu colonia").required("Campo obligatorio"),
})
