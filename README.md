# promise-singleflight
[![NPM](https://nodei.co/npm/promise-singleflight.svg?downloads=true&downloadRank=true)](https://nodei.co/npm/promise-solo/)

## Installation

```bash
$ npm install --save promise-singleflight
```

## API
### create<Key, ReturnValue>(): (key: Key, fn: () => Promise\<ReturnValue\>) => Promise\<ReturnValue\>;

Return a singleflight wrap function.


```cjs
const PromiseSingleflight = require("promise-singleflight")
const singleflight = PromiseSingleflight.create()
singleflight(key, async function(){
    ...
    return value
})
```

or

```mjs
import * as PromiseSingleflight from 'promise-singleflight'
const singleflight = PromiseSingleflight.create()
singleflight(key, async function(){
    ...
    return value
})
```


## Usage Example

```js
const PromiseSingleflight = require("promise-singleflight")
const singleflight = PromiseSingleflight.create()
function delay(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms)
    })
}

async function queryData(path) {
    return singleflight(path, async function () {
        console.log(`start queryData ${path}`)
        await delay(1000)
        console.log(`end queryData ${path}`)
        return `data:${path}`
    })
}

(async function () {
    const items = await Promise.all([
        queryData('/a'),
        queryData('/a'),
        queryData('/b'),
    ])
    console.log(items.join('\n'))
})()

// Output:
// start queryData /a
// start queryData /b
// end queryData /a
// end queryData /b
// data:/a
// data:/a
// data:/b
```
