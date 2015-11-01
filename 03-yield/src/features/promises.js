export function es5(cb) {
  setTimeout(function() {
    cb(null, 10)
  }, 1)
}

export function es6(ms) {
    const myPromise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject(new Error('Timeout after ' + ms + ' ms'));
        }, ms)
    })

    return myPromise;
}
