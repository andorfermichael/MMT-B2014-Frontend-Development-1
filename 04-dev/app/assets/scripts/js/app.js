import $ from 'jquery'
import page from 'page'
import fetch from 'isomorphic-fetch'
import Clipboard from 'clipboard'
import Handlebars from 'hbsfy/runtime'
import replace from './helpers/replace'
import dateFormat from './helpers/date-format'
import tplHome from '../templates/home.hbs'
import tplProfile from '../templates/profile.hbs'
import tplFollowers from '../templates/followers.hbs'
import tplRepositories from '../templates/repositories.hbs'
import tplCommits from '../templates/commits.hbs'
import tplContact from '../templates/contact.hbs'

import * as api from './apis/index'

Handlebars.registerHelper('replace', replace)
Handlebars.registerHelper('dateFormat', dateFormat)

var username = ''
var usernameField = ''

function proveUsername(e) {
	if (e.keyCode == 13) {
		console.log(api.github + `users/${usernameField.value}`)
		fetch(github + `users/${usernameField.value}`)
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
	//sessionStorage.username = ctx.params.name
	//console.log()
	fetch(api.github + `users/${sessionStorage.username}`)
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

function followers() {
	fetch(api.github + `users/${sessionStorage.username}/followers`)
	.then(response => {
		if (response.status >= 400) {
			$content.html('Error')
		}
		return response.json()
	})
	.then(data => {
		$content.html(tplFollowers({followersData: data}))
	})
	.catch(err => {
		$content.html('Error')
	})
}

function repositories() {
	fetch(api.github + `users/${sessionStorage.username}/repos`)
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
	fetch(api.github + `repos/${ctx.params.owner}/${ctx.params.name}/commits`)
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
	fetch(api.github + 'users/andorfermichael)
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

function profileloop(ctx) {
	sessionStorage.username = ctx.params.name
	page.redirect('/profile')
}

page('/', '/home')
page('/home', home)

page('/profile', profile)
page('/profileloop/:name', profileloop)

page('/followers', followers)

page('/repositories', repositories)

page('/repos/:owner/:name/commits', commits)

page('/contact', contact)

page()
