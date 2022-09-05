import { Factory } from "fishery"
import { faker } from "@faker-js/faker"

export default Factory.define(() => ({
  id: faker.datatype.uuid(),
  street: faker.lorem.word(),
  interior_number: faker.datatype.number(),
  outdoor_number: faker.datatype.number(),
  suburb: faker.helpers.arrayElement(["Minerva", "Granjas Esmeralda", "Los Cipreses", "Progreso del Sur"]),
  cp: faker.datatype.number(),
  country: faker.address.country(),
  municipality: faker.address.state(),
  city: faker.address.city(),
}))
