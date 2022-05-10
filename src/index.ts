type SingleflightHandler = () => any
export function createPromiseSingleflight (): (key: string, fn: SingleflightHandler) => Promise<any> {
  const group: Map<string, Promise<any>> = new Map()
  return async function (key: string, fn: SingleflightHandler) {
    const forget = function (): void { group.delete(key) }
    const call = async function (key: string, fn: SingleflightHandler): Promise<any> {
      if (group.has(key)) {
        return await group.get(key)
      }
      const handle = Promise.resolve(fn())
      handle.then(forget, forget)
      group.set(key, handle)
      return await handle
    }
    return await call(key, fn)
  }
}

export default createPromiseSingleflight
