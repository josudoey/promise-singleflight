module.exports = function () {
  const group = {}
  return function (key, fn) {
    const forget = function () { delete group[key] }
    const call = function (key, fn) {
      if (!group[key]) {
        group[key] = Promise.resolve(fn())
        group[key].then(forget, forget)
      }
      return group[key]
    }
    return call(key, fn)
  }
}
