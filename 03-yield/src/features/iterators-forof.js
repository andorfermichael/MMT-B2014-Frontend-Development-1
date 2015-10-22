export function es5() {
  var a = [1, 2, 3, 4, 5]
  var sum = 0

  for (var i = 0; i < a.length; i += 1) {
    sum += a[i]
  }

  return sum
}

export function es6() {
    const a = [1, 2, 3, 4, 5]
    let sum = 0

    for (let digit of a) {
        sum += digit
    }

    return sum
}
