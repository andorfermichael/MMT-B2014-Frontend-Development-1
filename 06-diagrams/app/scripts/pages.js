import d3 from 'd3'
import page from 'page'
import fetch from 'isomorphic-fetch'
import config from './config'
import tplHome from './templates/home.hbs'
import tplNotFound from './templates/not-found.hbs'
import tplError from './templates/error.hbs'
import barchart from './charts/barchart'
import geo from './charts/geo'
import circles from './charts/circles'

const content = document.getElementById('content')

let globalError

function driversByAge(data) {
  const drivers = data.MRData.DriverTable.Drivers
  return drivers
    .map(driver => {
      const dateOfBirth = new Date(driver.dateOfBirth)
      const age = (new Date()).getFullYear() - dateOfBirth.getFullYear()
      return {
        name: `${driver.givenName} ${driver.familyName}`,
        age
      }
    })
    .sort((a, b) => {
      if (a.age > b.age) {
        return 1
      }
      return -1
    })
}

export function home() {
  const drivers = fetch(`${config.api.url}/drivers.json?limit=10`)
  const courses = fetch(`${config.api.url}/circuits.json?limit=10`)
  Promise
    .all([drivers, courses])
    .then(values => {
      return Promise.all(values.map(val => val.json()))
    })
    .then(data => {
      const driversData = driversByAge(data[0])
      const coursesData = data[1].MRData.CircuitTable.Circuits

      content.innerHTML = tplHome({
        drivers: driversData,
        courses: coursesData
      })

      // create charts
      barchart('chart1', driversData)
      geo('chart2', coursesData)
      circles('chart3')
    })
    .catch(err => {
      globalError = err
      page('/error')
    })
}

export function notFound() {
  console.log('not Found')
  content.innerHTML = tplNotFound()
}

export function internalError() {
  content.innerHTML = tplError({error: globalError})
  throw globalError
}
