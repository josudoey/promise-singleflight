import { createPromiseSingleflight } from './singleflight'
let singleflight = createPromiseSingleflight<string,string>()

beforeEach(function () {
  singleflight = createPromiseSingleflight<string,string>()
})

describe('createPromiseSingleflight', function () {
  let count = 0
  async function delay (ms: number): Promise<void> {
    await new Promise<void>(function (resolve) {
      setTimeout(resolve, ms)
    })
  }

  async function incrFn (ms: number): Promise<string> {
    const result = count.toString()
    count++
    await delay(ms)
    return result
  }

  const queryForIncr = async function (key: string, ms: number): Promise<string> {
    return await singleflight(key, async function (): Promise<string> {
      return await incrFn(ms)
    })
  }

  it('queryForIncr', async function () {
    const items = await Promise.all([
      queryForIncr('same', 10),
      queryForIncr('same', 10),
      queryForIncr('diff', 10)
    ])
    expect(items[0]).toBe('0')
    expect(items[1]).toBe('0')
    expect(items[2]).toBe('1')
  })
})
