export function es5(list, val) {
  function includes(arr, val) {
    if (arr.indexOf(val) !== -1) {
      return true
    }
    return false
  }

  return includes(list, val)
}

export function es6(list, val) {
}
