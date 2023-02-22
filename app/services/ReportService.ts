import axios from '@/core/Axios'
import AdminDashboardModel from '@/models/AdminDashboardModel'

const getAdminDashboardReport = async (): Promise<AdminDashboardModel> => {
  try {
    const ret = await axios.get(`/report/dashboard`)

    const { data } = ret

    return {
      articleCount: data.articleCount,
      pageCount: data.pageCount,
      fileCount: data.fileCount,
    }
  } catch (err) {
    //const error: AxiosError = err;
    console.log('[ReportService] getItems() Error: ', err)
    return {} as any
  }
}

const service = {
  getAdminDashboardReport,
}

export default service
