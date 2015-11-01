export function es5() {
  var module = require('../utils')
  return module.uuid()
}

import * as util from '../utils'

export function es6() {
  return util.uuid()
}
