// ** service
import service from "@/services";

// ** models
import AdminDashboardModel from "@/models/AdminDashboardModel";

// ** config
import { EndpointUrls } from "@/config";

const ReportService = {
  getAdminDashboardReport: async () =>
    service<AdminDashboardModel>(`${EndpointUrls.report}/dashboard`),
};

Object.freeze(ReportService);

export default ReportService;
