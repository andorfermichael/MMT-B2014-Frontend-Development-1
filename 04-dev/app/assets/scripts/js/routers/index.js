import $ from 'jquery'
import page from 'page'
import fetch from 'isomorphic-fetch'
import tplHome from '../../templates/home.hbs'
import tplProfile from '../../templates/profile.hbs'
import tplFollowers from '../../templates/followers.hbs'
import tplRepositories from '../../templates/repositories.hbs'
import tplCommits from '../../templates/commits.hbs'
import tplContact from '../../templates/contact.hbs'
import * as api from '../apis/index'

const $content = $('#content')
const $nav = $('.nav')

var username = ''
var usernameField = ''


export function home() {
	$content.html(tplHome())
	usernameField = document.getElementById('username')
	if (sessionStorage.username) {
		usernameField.value = sessionStorage.username
	}
	else {
		usernameField.value = 'octocat'
		sessionStorage.username = 'octocat'
	}
	usernameField.addEventListener('keypress', function(e){
		proveUsername(e)
	})
}

export function profile() {
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

export function followers() {
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

export function repositories() {
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

export function commits(ctx) {
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

export function contact() {
	fetch(api.github + 'users/andorfermichael')
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

export function profileloop(ctx) {
	sessionStorage.username = ctx.params.name
	page.redirect('/profile')
}
