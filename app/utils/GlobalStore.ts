let store: any = {}

const globalStore = {}

const set = (key: string, value: any) => {
  store = { ...store, [key]: value }
}

const get = (key: string) => {
  return store[key]
}

export default { get, set }
