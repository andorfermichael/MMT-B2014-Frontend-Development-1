import {
  es5,
  es6
} from '../../src/features/apis'

export default function() {
  it('should test includes() in ES5', () => {
    es5([1, 2, 3, 4, 5], 3).should.eql(true)
    es5([1, 2, 3, 4, 5], 6).should.not.eql(true)
  })

  it('should test includes() in ES6', () => {
    es6([1, 2, 3, 4, 5], 3).should.eql(true)
    es6([1, 2, 3, 4, 5], 6).should.not.eql(true)
  })
}
