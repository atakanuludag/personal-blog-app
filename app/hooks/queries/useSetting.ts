import { useQueryClient, useQuery } from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import SettingService from '@/services/SettingService'

export default function useSetting(name: string) {
  const service = new SettingService()
  const queryName = QUERY_NAMES.SETTING

  const settingQuery = () =>
    useQuery([queryName], () => service.getItemByName(name))

  const invalidateSettingQuery = () => {
    const queryClientHook = useQueryClient()
    queryClientHook.invalidateQueries(queryName)
  }

  return { settingQuery, invalidateSettingQuery }
}
