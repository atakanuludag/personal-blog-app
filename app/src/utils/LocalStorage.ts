import LocalStorageModel from '@/models/LocalStorageModel'

const timestamp: number = new Date().getTime()
const cacheVersion: number = 1

export const setLocalStorage = (lsConstant: LocalStorageModel, data: any) => {
  try {
    if (typeof window === 'undefined') return
    const ls: any = { data, timestamp, cacheVersion }
    localStorage.setItem(lsConstant.key, JSON.stringify(ls))
  } catch (error) {
    console.log('[LocalStorage] setLocalStorage Err', error)
  }
}

export const removeLocalStorage = (lsConstant: LocalStorageModel) => {
  try {
    if (typeof window === 'undefined') return
    localStorage.removeItem(lsConstant.key)
  } catch (error) {
    console.log('[LocalStorage] removeLocalStorage Err', error)
  }
}

export const getLocalStorage = (lsConstant: LocalStorageModel) => {
  try {
    if (typeof window === 'undefined') return
    const ls: any = localStorage.getItem(lsConstant.key)
    if (ls != null) {
      const parseLs = JSON.parse(ls)

      if (
        cacheVersion > parseLs.cacheVersion ||
        typeof parseLs.cacheVersion === 'undefined'
      ) {
        console.log('Local Strorage updating...')
        localStorage.removeItem(lsConstant.key)
        return null
      }

      if (lsConstant.expired) {
        if (
          timestamp - parseLs.timestamp >
          lsConstant.expired * 60 * 60 * 1000
        ) {
          localStorage.removeItem(lsConstant.key)
          return null
        }
      }

      return parseLs ? parseLs.data : null
    }

    return null
  } catch (error) {
    console.log('[LocalStorage] getLocalStorage Err', error)
    return null
  }
}
