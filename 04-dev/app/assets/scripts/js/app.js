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

page('/', '/home')
page('/home', routers.home)

page('/profile', routers.profile)
page('/profileloop/:name', routers.profileloop)

page('/followers', routers.followers)

page('/repositories', routers.repositories)

page('/repos/:owner/:name/commits', routers.commits)

page('/contact', routers.contact)

page()
