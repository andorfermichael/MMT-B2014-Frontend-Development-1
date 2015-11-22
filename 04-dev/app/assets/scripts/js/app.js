import $ from 'jquery'
import page from 'page'
import fetch from 'isomorphic-fetch'
import Clipboard from 'clipboard'
import Handlebars from 'hbsfy/runtime'
import replace from './helpers/replace'
import dateFormat from './helpers/date-format'
import * as routers from './routers/index'
import * as globalVars from './globals/index'

Handlebars.registerHelper('replace', replace)
Handlebars.registerHelper('dateFormat', dateFormat)

new Clipboard('.btn-clipboard')

page('*', function(ctx, next) {
	globalVars.$nav
		.children()
		.removeClass('active')
	globalVars.$nav
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
