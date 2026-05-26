import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import toast from "react-hot-toast";

export function useLinks(page = 1, limit = 20) {
  return useQuery({
    queryKey: ["links", page, limit],
    queryFn: () =>
      api.get(`/api/links?page=${page}&limit=${limit}`).then((r) => r.data),
  });
}

export function useLink(id) {
  return useQuery({
    queryKey: ["link", id],
    queryFn: () => api.get(`/api/links/${id}`).then((r) => r.data),
    enabled: !!id,
  });
}

export function useCreateLink() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post("/api/links", data).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["links"] });
      toast.success("Short link created!");
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Failed to create link");
    },
  });
}

export function useUpdateLink() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) =>
      api.patch(`/api/links/${id}`, data).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["links"] });
      toast.success("Link updated");
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Failed to update link");
    },
  });
}

export function useDeleteLink() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/api/links/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["links"] });
      toast.success("Link deleted");
    },
    onError: () => toast.error("Failed to delete link"),
  });
}
