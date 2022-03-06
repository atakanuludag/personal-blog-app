import { useQuery } from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import ReportService from '@/services/ReportService'

export default function useAdminDashboardReport() {
  const service = ReportService
  const queryName = QUERY_NAMES.ADMIN_DASHBOARD_REPORT

  const adminDashboardReportQuery = () =>
    useQuery([queryName], () => service.getAdminDashboardReport())

  return {
    adminDashboardReportQuery,
  }
}
