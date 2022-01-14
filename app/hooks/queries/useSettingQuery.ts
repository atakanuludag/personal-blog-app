import { useQueryClient, useQuery } from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import SettingService from '@/services/SettingService'

export default function useSettingQuery() {
  const service = new SettingService()
  const queryName = QUERY_NAMES.SETTING

  const settingQuery = () => useQuery([queryName], () => service.getItems())

  // const settingByNameQuery = (name: string) =>
  //   useQuery([queryName, name], () => {
  //     const query = await settingQuery();
  //     if(query.)
  //   })

  const invalidateSettingQuery = () => {
    const queryClientHook = useQueryClient()
    queryClientHook.invalidateQueries(queryName)
  }

  return { settingQuery, invalidateSettingQuery }
}
