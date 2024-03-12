// ** service
import service from "@/services";

// ** models
import AdminDashboardModel from "@/models/AdminDashboardModel";

// ** config
import { ENDPOINT_URLS } from "@/config";

const ReportService = {
  getAdminDashboardReport: async () =>
    service<AdminDashboardModel>(`${ENDPOINT_URLS.report}/dashboard`),
};

Object.freeze(ReportService);

export default ReportService;
