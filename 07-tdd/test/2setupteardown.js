var should = require('should')
var createDog = require('../src/2setupteardown.js')

describe('setup', function() {

	var dog;

  before(function() {
  	console.log("before test: create dog")
  	dog = createDog("Franzi")
  })

  after(function() {
    console.log("after test: destroy dog")
    dog = null;
  })

  it('dog should have name', function() {
  	dog.should.have.property('name')
  	dog.name.should.be.a.String()
  })

  it('dog should make woof sound', function() {
  	should(dog.makeSound()).eql("Woof")
  })

})
