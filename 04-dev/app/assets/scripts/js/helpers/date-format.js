import moment from 'moment'

export default function(s, options) {
  const hash = Object.assign({
    format: 'MMMM YYYY'
  }, options.hash)
  return moment(s).format(hash.format)
}
