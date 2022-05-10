export function createPromiseSingleflight (): (key: string, fn: () => any) => Promise<any> {
  const group: Map<string, Promise<any>> = new Map()
  return async function (key: string, fn: () => any) {
    const forget = function (): void { group.delete(key) }
    const call = async function (key: string, fn: () => any): Promise<any> {
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
