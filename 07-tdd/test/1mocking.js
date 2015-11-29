var should = require('should')
var mockFramework = require('a')
var newUser = require('../src/1mocking.js')

describe('mocking object', function() {
    it('should return the return value which the function would return in production', function() {
        var user = newUser('Michael Andorfer')
        var userMock = mockFramework.mock(user)
        userMock.getName.expect().return('Michael Andorfer Substitution')

        should(user.getName()).equal('Michael Andorfer Substitution')
        should(userMock.verify()).be.true
    })
})
