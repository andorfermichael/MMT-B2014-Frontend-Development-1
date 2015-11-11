import $ from 'jquery'
import page from 'page'
import fetch from 'isomorphic-fetch'
import tplHome from './templates/home.hbs'
import tplDrivers from './templates/drivers.hbs'

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
	})
	.catch(err => {
		$content.html('Error')
	})
}



page('/', '/home')
page('/home', home)

page('/drivers', drivers)
page()
