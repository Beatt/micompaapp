# Descripción

Prueba técnica de mi compa FULLSTACK. Crear CRUD para registrar direcciones, apoyándonos de
Google places y el API de [micompaapi](https://github.com/Beatt/micompaapi).

## Requerimientos

- node v14.20.0
- npm v6.13.4

## Tecnologías

- React
- React Router
- Jest
- Formik
- Yup
- Fishery
- Husky
- MaterialUI
- Prettier js
- Faker js
- Axios
- Googlemaps API

## Instalación

- `git clone git@github.com:Beatt/micompaapp.git`
- `npm install`
- `npm prepare`
- Copiar **.env.development** y renombrar a **.env.development.local**
- Modificar las envs de **.env.development.local**
  - **REACT_APP_API_URL**. Dirección del api [micompaapi](https://github.com/Beatt/micompaapi)
  - **REACT_APP_GOOGLE_MAPS_API_KEY**. https://developers.google.com/maps/documentation/javascript/places
- `npm start`

## Tests

`npm test`

## Formatting code

`npm run prettier`
