import $ from 'jquery'
import page from 'page'
import fetch from 'isomorphic-fetch'
import Clipboard from 'clipboard'
import Handlebars from 'hbsfy/runtime'
import replace from './helpers/replace'
import dateFormat from './helpers/date-format'
import tplHome from '../templates/home.hbs'
import tplProfile from '../templates/profile.hbs'
import tplRepositories from '../templates/repositories.hbs'

Handlebars.registerHelper('replace', replace)
Handlebars.registerHelper('dateFormat', dateFormat)

const $content = $('#content')
const $nav = $('.nav')

new Clipboard('.btn-clipboard')

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

function profile() {
	fetch('http://api.github.com/users/andorfermichael')
	.then(response => {
		if (response.status >= 400) {
			$content.html('Error')
		}
		return response.json()
	})
	.then(data => {
			$content.html(tplProfile({profileData: data}))
	})
	.catch(err => {
			$content.html('Error')
	})
}

function repositories() {
	fetch('https://api.github.com/users/andorfermichael/repos')
	.then(response => {
		if (response.status >= 400) {
			$content.html('Error')
		}
		return response.json()
	})
	.then(data => {
		$content.html(tplRepositories({repositoriesData: data}))
	})
	.catch(err => {
		$content.html('Error')
	})
}

page('/', '/home')
page('/home', home)

page('/profile', profile)

page('/repositories', repositories)

page()
