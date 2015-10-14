export function es5() {
  var o = {}
  var consts = {}

  Object.defineProperty(consts, 'BASE', {
    value: 2
  })

  function constants(val) {
    return Math.pow(consts.BASE, val)
  }

  function scope(n) {
    var sum = 0
    for (var i = 0; i < n; i += 1) {
      sum += i
    }
    return i
  }

  o.constants = constants
  o.scope = scope

  return o
}

export function es6() {
  const BASE = 2;

  return {
    constants: function(val) {
      return Math.pow(BASE, val)
    },
    scope: function(n) {
      let sum = 0
      for (let i = 0; i < n; i += 1) {
        sum += 1
      }
      return i
    }
  }
}
