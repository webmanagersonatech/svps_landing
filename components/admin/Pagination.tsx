import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Pagination({
  page,
  totalPages,
  totalDocs,
  onChange,
}: {
  page: number;
  totalPages: number;
  totalDocs: number;
  onChange: (p: number) => void;
}) {
  if (totalPages <= 1) return <p className="mt-4 text-xs text-slate-500">{totalDocs} item(s)</p>;
  return (
    <div className="mt-5 flex items-center justify-between">
      <p className="text-xs text-slate-500">
        Page {page} of {totalPages} · {totalDocs} items
      </p>
      <div className="flex gap-2">
        <button disabled={page <= 1} onClick={() => onChange(page - 1)} className="btn-secondary !px-3 disabled:opacity-40">
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <button disabled={page >= totalPages} onClick={() => onChange(page + 1)} className="btn-secondary !px-3 disabled:opacity-40">
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
