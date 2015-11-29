var should = require('should')
var fixture = require('../src/fixture2.js')

describe('fixture', function() {

  var dogs = fixture()

  it('name of dog 1 should be Don and breed should be Bulldog', function() {
    should(dogs[0].name).eql("Don")
    should(dogs[0].breed).eql("Bulldog")
    should(dogs[0].weight).eql(15)
    should(dogs[0].sound).eql("Wroof")
  })

  it('name of dog 2 should be Strizi and breed should be Dachshund', function() {
    should(dogs[1].name).eql("Strizi")
    should(dogs[1].breed).eql("Dachshund")
    should(dogs[1].weight).eql(5)
    should(dogs[1].sound).eql("Irf")
  })

  it('name of dog 1 should be changed to Doser', function() {
    dogs[0].name = "Doser"
    should(dogs[0].name).eql("Doser")
  })

  it('weight of dog 2 should be changed to 8', function() {
    dogs[1].weight = 8
    should(dogs[1].weight).eql(8)
  })
})
