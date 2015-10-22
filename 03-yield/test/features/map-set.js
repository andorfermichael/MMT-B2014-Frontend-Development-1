import {
  es5,
  es6
} from '../../src/features/map-set'

export default function() {
  it('should emulate Map/Set behavior in ES5', () => {
    var klasses = es5()
    var mySet = new klasses.MySet()
    mySet
      .add(1)
      .add(2)
      .add(3)

    mySet.has(1).should.be.true
    mySet.has(2).should.be.true
    mySet.has(3).should.be.true
    mySet.has(4).should.be.false

    var myMap = new klasses.MyMap()
    myMap.set('Hello', 'World!')
    myMap.set('second', 2);
    (function() {
      myMap.set(1, 2)
    }).should.throw()
    myMap.get('Hello').should.eql('World!')
    myMap.get('second').should.eql(2)
  })

  it('should show Map/Set behavior in ES6', () => {
    const s = new Set()
    s
    .add(1)
    .add(2)
    .add(3)

    s.has(1).should.be.true
    s.has(2).should.be.true
    s.has(3).should.be.true
    s.has(4).should.be.false

    const m = new Map()
    m.set('Hello', 'World!')
    m.set('second', 2);
    (function() {
        m.set(1, 2)
    }).should.not.throw()
    m.get('Hello').should.eql('World!')
    m.get('second').should.eql(2)

  })
}
