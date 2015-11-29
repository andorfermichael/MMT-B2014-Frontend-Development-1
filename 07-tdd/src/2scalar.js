module.exports = function scalar(x) {
  if (typeof x === 'number') {
    return x
  }
  if (typeof x === 'string') {
    return x
  }
  if (typeof x === 'boolean') {
    return x
  }
  throw new Error('Does only accept scalar input')
}
