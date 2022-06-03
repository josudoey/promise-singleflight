import { expectType } from 'tsd'
import * as PromiseSingleflight from '../'
import { createPromiseSingleflight } from '../'

expectType<Promise<string>>(PromiseSingleflight.create<string, string>()('string', async function (): Promise<string> {
  return 'test'
}))

expectType<Promise<string>>(createPromiseSingleflight<string, string>()('string', async function (): Promise<string> {
  return 'test'
}))
