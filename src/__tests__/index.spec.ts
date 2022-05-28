import * as PromiseSingleflight from '../index'
import { createPromiseSingleflight } from '../index'

describe('create', function () {
  it('equal createPromiseSingleflight', function () {
    expect(PromiseSingleflight.create).toBe(createPromiseSingleflight)
  })
})
