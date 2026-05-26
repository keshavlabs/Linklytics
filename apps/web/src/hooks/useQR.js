import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useQRCode(linkId, options = {}) {
  const {
    format = "png",
    size = 300,
    color = "#000000",
    bg = "#ffffff",
  } = options;

  return useQuery({
    queryKey: ["qr", linkId, format, size, color, bg],
    queryFn: () =>
      api
        .get(`/api/links/${linkId}/qr`, {
          params: { format, size, color, bg },
        })
        .then((r) => r.data),
    enabled: !!linkId,
    staleTime: Infinity, // QR codes don't change
  });
}
