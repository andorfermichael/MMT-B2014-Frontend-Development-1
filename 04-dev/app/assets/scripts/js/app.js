import $ from 'jquery'
import page from 'page'
import fetch from 'isomorphic-fetch'
import tplHome from './templates/home.hbs'
import tplConstructors from './templates/constructors.hbs'
import tplDrivers from './templates/drivers.hbs'
import tplRaces from './templates/races.hbs'
import tplCircuits from './templates/circuits.hbs'

const $content = $('#content')
const $nav = $('.nav')

page('*', function(ctx, next) {
	$nav
		.children()
		.removeClass('active')
	$nav
		.find('a[href|="' + ctx.path + '"]')
		.parent()
		.addClass('active')
	next()
})

function home() {
	$content.html(tplHome())
}

function constructors() {
	fetch('http://ergast.com/api/f1' + '/constructors.json')
		.then(response => {
		if (response.status >= 400) {
			$content.html('Error')
		}
		return response.json()
	})
	.then(data => {
		$content.html(tplConstructors({constructors: data.MRData.ConstructorTable.Constructors}))
	})
	.catch(err => {
		$content.html('Error')
	})
}

function drivers() {
	fetch('http://ergast.com/api/f1' + '/drivers.json')
	.then(response => {
		if (response.status >= 400) {
			$content.html('Error')
		}
		return response.json()
	 })
	.then(data => {
		$content.html(tplDrivers({drivers: data.MRData.DriverTable.Drivers}))
	console.log({races: data.MRData.CircuitTable.Circuits})
	})
	.catch(err => {
		$content.html('Error')
	})
}

function races() {
	fetch('http://ergast.com/api/f1' + '/races.json')
		.then(response => {
		if (response.status >= 400) {
			$content.html('Error')
		}
		return response.json()
	})
	.then(data => {
		$content.html(tplRaces({races: data.MRData.RaceTable.Races}))
	})
	.catch(err => {
		$content.html('Error')
	})
}

function circuits() {
	fetch('http://ergast.com/api/f1' + '/circuits.json')
		.then(response => {
		if (response.status >= 400) {
			$content.html('Error')
		}
		return response.json()
	})
	.then(data => {
		$content.html(tplCircuits({circuits: data.MRData.CircuitTable.Circuits}))
		console.log({circuits: data.MRData.CircuitTable.Circuits})
	})
	.catch(err => {
		$content.html('Error')
	})
}



page('/', '/home')
page('/home', home)

page('/constructors', constructors)

page('/drivers', drivers)

page('/races', races)

page('/circuits', circuits)

page()
