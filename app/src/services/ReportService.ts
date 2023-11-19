import service from "@/services";
import AdminDashboardModel from "@/models/AdminDashboardModel";
import { EndpointUrls } from "@/config";

const ReportService = {
  getAdminDashboardReport: async (): Promise<AdminDashboardModel> =>
    service(`${EndpointUrls.report}/dashboard`),
};

Object.freeze(ReportService);

export default ReportService;
