var should = require('should')
var setup = require('../src/1setup.js')

describe('setup - array manipulation', function() {
    var testArray = []

    // Setup
    beforeEach(function() {
        testArray = [1, 2, 3]
    })

    it('should add element at the beginning of array', function() {
        const result = setup(testArray, 1)
        should(result[0]).be.exactly(0).and.be.a.Number()
    })

    it('should remove first element of array', function() {
        should(setup(testArray, 2)).be.exactly(1).and.be.a.Number()
    })

    it('should add element at the end of array', function() {
        const result = setup(testArray, 3)
        should(result[3]).be.exactly(4).and.be.a.Number()
     })

    it('should remove last element of array', function() {
        should(setup(testArray, 4)).be.exactly(3).and.be.a.Number()
    })
})
