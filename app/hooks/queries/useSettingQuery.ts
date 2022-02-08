import { useQuery } from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import SettingService from '@/services/SettingService'

export default function useSettingQuery() {
  const service = SettingService
  const queryName = QUERY_NAMES.SETTINGS

  const settingsQuery = () => useQuery([queryName], () => service.getItems())

  return {
    settingsQuery,
  }
}
