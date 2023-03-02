interface Cb {
  (...arg: unknown[]): unknown
}
const cacheMap = new Map();

export default (key: string, callback: Cb) => {
  return async (cache = true) => {
    const result = cacheMap.get(key)

    if(cache && result) {
      return result
    }

    const res = await callback()
    cacheMap.set(key, res)

    return res
  }
}
