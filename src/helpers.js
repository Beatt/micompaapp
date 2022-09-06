export const resolveAddressComponentToAddress = (addressComponent) => {
  let address = {}

  for (const component of addressComponent) {
    const componentType = component.types[0]

    switch (componentType) {
      case "street_number": {
        address = { ...address, outdoor_number: component.long_name }
        break
      }

      case "route": {
        address = { ...address, street: component.long_name }
        break
      }

      case "postal_code": {
        address = { ...address, cp: component.long_name }
        break
      }

      case "locality":
        address = { ...address, state: component.long_name }
        break

      case "administrative_area_level_1": {
        address = { ...address, city: component.long_name }
        break
      }
      case "country":
        address = { ...address, country: component.long_name }
        break
    }
  }

  return address
}
