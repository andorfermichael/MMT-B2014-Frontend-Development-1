export function es5() {
  function d(spec) {
    var x = spec.x || 0
    var y = spec.y || 0
    var z = spec.z || 0

    return x + y + z
  }

  return d
}

export function es6() {
  function defaults(spec) {
      const {x = 0} = spec
      const {y = 0} = spec
      const {z = 0} = spec

    return x + y + z
  }

  return defaults
}
