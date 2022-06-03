import * as PromiseSingleflight from '../'
import { createPromiseSingleflight } from '../'

describe('create', function () {
  it('equal createPromiseSingleflight', function () {
    expect(PromiseSingleflight.create).toBe(createPromiseSingleflight)
  })
})
