import $ from 'jquery'
import page from 'page'
import fetch from 'isomorphic-fetch'
import Clipboard from 'clipboard'
import Handlebars from 'hbsfy/runtime'
import replace from './helpers/replace'
import dateFormat from './helpers/date-format'
import * as api from './apis/index'
import * as routers from './routers/index'

Handlebars.registerHelper('replace', replace)
Handlebars.registerHelper('dateFormat', dateFormat)

const $content = $('#content')
const $nav = $('.nav')

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

//page('/', '/home')
page('/home', routers.home)

page('/profile', routers.profile)
page('/profileloop/:name', routers.profileloop)

page('/followers', routers.followers)

page('/repositories', routers.repositories)

page('/repos/:owner/:name/commits', routers.commits)

page('/contact', routers.contact)

page()
