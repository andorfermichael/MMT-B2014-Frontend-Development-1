var should = require('should')
var fixtures = require('node-fixtures')
var updateName = require('../src/1fixture')

describe('fixtures', function() {
    it('should read the name of person 1 in users fixture', function() {
        should(fixtures.users.p1.name).equal('Michael')
    })

    it('should read the name of person 2 in users fixture', function() {
        should(fixtures.users.p2.name).equal('Viktoria')
    })

    it('should change the name of person 1 in users fixture', function() {
        var result = updateName(fixtures.users.p1, 'Mike')
        should(result).equal('Mike')
    })

    it('should change the name of person 2 in users fixture', function() {
        var result = updateName(fixtures.users.p2, 'Viki')
        should(result).equal('Viki')
    })
})
