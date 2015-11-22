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
import tplCommits from '../templates/commits.hbs'
import tplContact from '../templates/contact.hbs'

Handlebars.registerHelper('replace', replace)
Handlebars.registerHelper('dateFormat', dateFormat)

var username = ''
var usernameField = ''

function proveUsername(e) {
	if (e.keyCode == 13) {
		fetch('http://api.github.com/' + `users/${usernameField.value}`)
		.then(response => {
			if (response.status >= 400) {
				document.getElementById('username-error').style.display = 'inline-block'
				document.getElementById('username-success').style.display = 'none'
				$('#form-group-username').addClass('has-error').removeClass('has-success')
				return
			}
			else {
				sessionStorage.username = usernameField.value
				document.getElementById('username-error').style.display = 'none'
				document.getElementById('username-success').style.display = 'inline-block'
				$('#form-group-username').addClass('has-success').removeClass('has-error')
			}
		})
	}
}

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
	usernameField = document.getElementById('username')
	//username = usernameField.value
	//sessionStorage.username = usernameField.value
	if (sessionStorage.username) {
		usernameField.value = sessionStorage.username
	} else {
		usernameField.value = 'octocat'
		sessionStorage.username = 'octocat'
	}
	usernameField.value = sessionStorage.username
	usernameField.addEventListener('keypress', function(e){
		proveUsername(e)
	})
}

function profile() {
	fetch('http://api.github.com/' + `users/${sessionStorage.username}`)
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
	fetch('https://api.github.com/' + `users/${sessionStorage.username}/repos`)
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

function commits(ctx) {
	fetch('https://api.github.com/' + `repos/${ctx.params.owner}/${ctx.params.name}/commits`)
	.then(response => {
		if (response.status >= 400) {
			$content.html('Error')
		}
		return response.json()
	})
	.then(data => {
		$content.html(tplCommits({commitsData: data}))
	})
	.catch(err => {
		$content.html('Error')
	})
}

function contact() {
	fetch('http://api.github.com/' + 'users/andorfermichael')
	.then(response => {
		if (response.status >= 400) {
			$content.html('Error')
		}
		return response.json()
	})
	.then(data => {
		$content.html(tplContact({contactData: data}))
	})
	.catch(err => {
		$content.html('Error')
	})
}

page('/', '/home')
page('/home', home)

page('/profile', profile)

page('/repositories', repositories)

page('/repos/:owner/:name/commits', commits)

page('/contact', contact)

page()
