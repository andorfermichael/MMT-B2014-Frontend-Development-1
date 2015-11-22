import $ from 'jquery'
import page from 'page'
import fetch from 'isomorphic-fetch'
import * as api from '../apis/index'
import * as globalVars from '../globals/index'

export default function(e) {
	let usernameErrorText = document.getElementById('username-error')
	let usernameSuccessText = document.getElementById('username-success')
	const usernameFormGroup = $('#form-group-username')

	if (e.keyCode == 13) {
		fetch(api.github + `users/${globalVars.usernameField.value}`)
		.then(response => {
			if (response.status >= 400) {
				usernameErrorText.style.display = 'inline-block'
				usernameSuccessText.style.display = 'none'
				usernameFormGroup.addClass('has-error').removeClass('has-success')
				return
			}
			else
			{
				sessionStorage.username = globalVars.usernameField.value
				usernameErrorText.style.display = 'none'
				usernameSuccessText.style.display = 'inline-block'
				usernameFormGroup.addClass('has-success').removeClass('has-error')
			}
		})
	}
}
