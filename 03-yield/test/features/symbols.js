import {
  es5,
  es6
} from '../../src/features/symbols'

export default function() {
  it('should show that symbols do not exist in ES5', () => {

  })

  it('should show symbols syntax and behavior in ES6', () => {
    const sym = es6();

    function test(sym){
      if (typeof sym === 'symbol')
        return true
      else
        return false
    }

    test(sym).should.be.true
  })
}
