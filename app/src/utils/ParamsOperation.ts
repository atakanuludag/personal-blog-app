export const isPagingParams = (params: string[]) =>
  params.some((p) => p.includes('page'))

export const getLatestParam = (isPaging: boolean, params: string[]) =>
  params[params.length - (isPaging ? 3 : 1)]

export const getPageParam = (isPaging: boolean, params: string[]) =>
  isPaging ? Number(params[params.length - 1]) : 1

export const getUrlByRemovePageParam = (isPaging: boolean, params: string[]) =>
  isPaging ? params.slice(0, params.indexOf('page')) : params
