var should = require('should')
var scalar = require('../src/1scalar.js')

describe('scalar', function() {
	it('should take a number as input', function() {
		should(scalar(10)).be.a.Number()
	})

	it('should take a string as input', function() {
		should(scalar('hello')).be.a.String()
	})

	it('should take a boolean as input', function() {
		should(scalar(true)).be.a.Boolean()
	})

	it('should not take a null as input', function() {
		(function() {
			scalar(null)
		}).should.throw()
	})

	it('should not take an object as input', function() {
		(function() {
			scalar({})
		}).should.throw()
	})
})
