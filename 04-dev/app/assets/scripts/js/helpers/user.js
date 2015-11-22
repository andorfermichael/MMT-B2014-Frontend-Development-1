import $ from 'jquery'
import page from 'page'
import fetch from 'isomorphic-fetch'
import * as api from '../apis/index'

export default function(e) {
	if (e.keyCode == 13) {
		fetch(api.github + `users/${usernameField.value}`)
		.then(response => {
			if (response.status >= 400) {
				document.getElementById('username-error').style.display = 'inline-block'
				document.getElementById('username-success').style.display = 'none'
				$('#form-group-username').addClass('has-error').removeClass('has-success')
				return
			}
			else
			{
				sessionStorage.username = usernameField.value
				document.getElementById('username-error').style.display = 'none'
				document.getElementById('username-success').style.display = 'inline-block'
				$('#form-group-username').addClass('has-success').removeClass('has-error')
			}
		})
	}
}
