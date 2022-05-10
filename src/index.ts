type SingleflightHandler = () => any;
export function createPromiseSingleflight(): (key: string, fn: SingleflightHandler) => Promise<any> {
  const group: any = {}
  return function (key: string, fn: SingleflightHandler) {
    const forget = function () { delete group[key] }
    const call = function (key: string, fn: SingleflightHandler) {
      if (!group[key]) {
        group[key] = Promise.resolve(fn())
        group[key].then(forget, forget)
      }
      return group[key]
    }
    return call(key, fn)
  }
}

export default createPromiseSingleflight