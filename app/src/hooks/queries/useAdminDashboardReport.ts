"use client";

// ** third party
import { useQuery } from "react-query";

// ** services
import ReportService from "@/services/ReportService";

// ** config
import { QUERY_NAMES } from "@/config";

export default function useAdminDashboardReport() {
  const service = ReportService;
  const queryName = QUERY_NAMES.ADMIN_DASHBOARD_REPORT;

  const useAdminDashboardReportQuery = () =>
    useQuery([queryName], () => service.getAdminDashboardReport());

  return {
    useAdminDashboardReportQuery,
  };
}
