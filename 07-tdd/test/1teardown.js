var should = require('should')
var teardown = require('../src/1teardown.js')

describe('teardown - set manipulation', function() {
    var set = new Set()
    set.add(3)

    // Teardown
    afterEach(function() {
        set = new Set()
    })

    it('should add one number to a non empty set', function() {
        teardown(set, 2, 'int')
        should(set.size).be.exactly(3)
        should(set.has(0)).be.true
        should(set.has(1)).be.true
        should(set.has(3)).be.true
        should(set.has(2)).equal(false)
        should(set.values().next().value).be.type('number')
    })

    it('should add one number to an empty set', function() {
        teardown(set, 1, 'int')
        should(set.size).be.exactly(1)
        should(set.has(0)).be.true
        should(set.has(1)).equal(false)
        should(set.values().next().value).be.type('number')
    })

    it('should add two strings to an empty set', function() {
        teardown(set, 2, 'string')
        should(set.size).be.exactly(2)
        should(set.has("0")).be.true
        should(set.has("1")).be.true
        should(set.values().next().value).be.type('string')
        should(set.has(1)).equal(false)
    })
})
