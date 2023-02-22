import axios from '@/core/Axios'
import AdminDashboardModel from '@/models/AdminDashboardModel'

const serviceBaseUrl = `/report`

const ReportService = {
  getAdminDashboardReport: async (): Promise<AdminDashboardModel | null> => {
    try {
      const ret = await axios.get(`${serviceBaseUrl}/dashboard`)

      const { data } = ret

      return {
        articleCount: data.articleCount,
        pageCount: data.pageCount,
        fileCount: data.fileCount,
      }
    } catch (err) {
      console.log('[ReportService] getItems() Error: ', err)
      return null
    }
  },
}

Object.freeze(ReportService)

export default ReportService
