"use client";

import { useState } from "react";
import { useLinks } from "@/hooks/useLinks";
import LinkCard from "@/components/links/LinkCard";
import CreateLinkForm from "@/components/links/CreateLinkForm";
import Pagination from "@/components/ui/pagination";
import EmptyState from "@/components/ui/empty-state";
import { PageSpinner } from "@/components/ui/spinner";
import Dialog from "@/components/ui/dialog";

export default function LinksPage() {
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const { data, isLoading } = useLinks(page);

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Links</h1>
          <p className="text-gray-400 text-sm mt-1">
            {data?.total ?? 0} total links
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          + New link
        </button>
      </div>

      <Dialog
        open={showForm}
        onClose={() => setShowForm(false)}
        title="Create short link"
        description="Paste a long URL and we'll make it short."
      >
        <CreateLinkForm onSuccess={() => setShowForm(false)} />
      </Dialog>

      {isLoading ? (
        <PageSpinner />
      ) : data?.links?.length === 0 ? (
        <div className="card">
          <EmptyState
            icon="⇗"
            title="No links yet"
            description="Create your first short link to get started."
            action={
              <button
                className="btn-primary text-sm"
                onClick={() => setShowForm(true)}
              >
                Create your first link
              </button>
            }
          />
        </div>
      ) : (
        <div className="space-y-3">
          {data?.links?.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </div>
      )}

      <Pagination
        page={page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={setPage}
      />
    </div>
  );
}
