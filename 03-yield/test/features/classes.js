import {
  es5,
  es6
} from '../../src/features/classes'

export default function() {
  it('should show prototypes in ES5', () => {
    es5('World!').should.eql('World!')
  })

  it.skip('should show class functions in ES6', () => {
    es6('World!').should.eql('World!')
  })
}
