import {
  es5,
  es6
} from '../../src/features/promises'

export default function() {
  it('should wait for result in ES5', (done) => {
    es5(function(err, val) {
      if (err) {
        done(err)
      }
      val.should.eql(10)
      done()
    })
  })

  it('should show Promise behavior in ES6', () => {
    es6(10)
        .then(function (val) {
          val.should.eql(10)
        })
        .catch(function (reason) {
          console.error('Error', reason);
        })
  })
}
