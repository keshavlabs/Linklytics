import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => api.get("/api/analytics/dashboard").then((r) => r.data),
  });
}

export function useLinkAnalytics(linkId, days = 30) {
  return useQuery({
    queryKey: ["analytics", linkId, days],
    queryFn: () =>
      api.get(`/api/analytics/${linkId}?days=${days}`).then((r) => r.data),
    enabled: !!linkId,
  });
}
