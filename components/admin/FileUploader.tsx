import { useEffect, useMemo, useRef } from "react";
import { CloudArrowUpIcon, DocumentTextIcon, XMarkIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { fileUrl } from "../../lib/adminApi";
import { fileNameFromPath, isImagePath } from "../../lib/adminUtils";

type Props = {
  label: string;
  hint?: string;
  accept: string[]; // mimetypes
  maxSizeMB: number;
  existing?: string[]; // already-saved paths
  removed: string[]; // saved paths marked for deletion
  onToggleRemoved: (path: string) => void;
  files: File[]; // newly picked files
  onFilesChange: (files: File[]) => void;
  onError: (message: string) => void;
};

export default function FileUploader({
  label,
  hint,
  accept,
  maxSizeMB,
  existing = [],
  removed,
  onToggleRemoved,
  files,
  onFilesChange,
  onError,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const previews = useMemo(
    () => files.map((f) => ({ file: f, url: f.type.startsWith("image/") ? URL.createObjectURL(f) : "" })),
    [files]
  );
  useEffect(() => () => previews.forEach((p) => p.url && URL.revokeObjectURL(p.url)), [previews]);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const ok: File[] = [];
    Array.from(list).forEach((f) => {
      if (!accept.includes(f.type)) return onError(`"${f.name}" is not an allowed file type`);
      if (f.size > maxSizeMB * 1024 * 1024) return onError(`"${f.name}" is larger than ${maxSizeMB}MB`);
      ok.push(f);
    });
    if (ok.length) onFilesChange([...files, ...ok]);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        {hint && <span className="text-xs text-slate-400">{hint}</span>}
      </div>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          addFiles(e.dataTransfer.files);
        }}
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center transition hover:border-primary hover:bg-orange-50/40"
      >
        <CloudArrowUpIcon className="h-8 w-8 text-slate-400" />
        <p className="mt-1 text-sm text-slate-600">
          <span className="font-medium text-primary">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-slate-400">Max {maxSizeMB}MB per file</p>
        <input ref={inputRef} type="file" multiple hidden accept={accept.join(",")} onChange={(e) => addFiles(e.target.files)} />
      </div>

      {(existing.length > 0 || previews.length > 0) && (
        <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {existing.map((p) => {
            const isRemoved = removed.includes(p);
            return (
              <div key={p} className={`group relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-100 ${isRemoved ? "opacity-40" : ""}`}>
                {isImagePath(p) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={fileUrl(p)} alt="" className="h-full w-full object-cover" />
                ) : (
                  <a href={fileUrl(p)} target="_blank" rel="noreferrer" className="flex h-full flex-col items-center justify-center gap-1 p-2 text-center">
                    <DocumentTextIcon className="h-8 w-8 text-slate-400" />
                    <span className="line-clamp-2 break-all text-[10px] text-slate-500">{fileNameFromPath(p)}</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => onToggleRemoved(p)}
                  title={isRemoved ? "Undo remove" : "Remove"}
                  className="absolute right-1 top-1 rounded-full bg-white/90 p-1 shadow hover:bg-white"
                >
                  {isRemoved ? <ArrowUturnLeftIcon className="h-4 w-4 text-slate-700" /> : <XMarkIcon className="h-4 w-4 text-red-600" />}
                </button>
                {isRemoved && <span className="absolute inset-x-0 bottom-0 bg-red-600 py-0.5 text-center text-[10px] text-white">Will be removed</span>}
              </div>
            );
          })}

          {previews.map(({ file, url }, i) => (
            <div key={`${file.name}-${i}`} className="relative aspect-square overflow-hidden rounded-lg border-2 border-primary/40 bg-slate-100">
              {url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={url} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-1 p-2 text-center">
                  <DocumentTextIcon className="h-8 w-8 text-slate-400" />
                  <span className="line-clamp-2 break-all text-[10px] text-slate-500">{file.name}</span>
                </div>
              )}
              <button
                type="button"
                onClick={() => onFilesChange(files.filter((_, idx) => idx !== i))}
                className="absolute right-1 top-1 rounded-full bg-white/90 p-1 shadow hover:bg-white"
                title="Remove"
              >
                <XMarkIcon className="h-4 w-4 text-red-600" />
              </button>
              <span className="absolute inset-x-0 bottom-0 bg-primary py-0.5 text-center text-[10px] text-white">New</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
