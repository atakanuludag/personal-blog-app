"use client";

import { useQuery } from "react-query";
import { QUERY_NAMES } from "@/config";
import ReportService from "@/services/ReportService";

export default function useAdminDashboardReport() {
  const service = ReportService;
  const queryName = QUERY_NAMES.ADMIN_DASHBOARD_REPORT;

  const useAdminDashboardReportQuery = () =>
    useQuery([queryName], () => service.getAdminDashboardReport());

  return {
    useAdminDashboardReportQuery,
  };
}
