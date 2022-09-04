import { Factory } from "fishery"
import { faker } from "@faker-js/faker"

export default Factory.define(() => ({
  id: faker.datatype.uuid(),
  user: faker.internet.userName(),
  street: faker.lorem.word(),
  interiorNumber: faker.datatype.number(),
  outdoorNumber: faker.datatype.number(),
  suburb: faker.helpers.arrayElement(["Minerva", "Granjas Esmeralda", "Los Cipreses", "Progreso del Sur"]),
  cp: faker.datatype.number(),
}))
