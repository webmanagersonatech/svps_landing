import { useEffect, useMemo, useRef } from "react";
import { ArrowPathIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { fileUrl } from "../../lib/adminApi";
import { IMAGE_TYPES } from "../../lib/adminUtils";

type Props = {
  existing?: string; // saved thumbnail path (edit mode)
  file: File | null; // newly picked thumbnail
  onChange: (file: File | null) => void;
  onError: (message: string) => void;
  required?: boolean;
  maxSizeMB?: number;
};

export default function ThumbnailPicker({ existing, file, onChange, onError, required, maxSizeMB = 10 }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const preview = useMemo(() => (file ? URL.createObjectURL(file) : ""), [file]);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const pick = (list: FileList | null) => {
    const f = list?.[0];
    if (!f) return;
    if (!IMAGE_TYPES.includes(f.type)) onError("Thumbnail must be a JPG, PNG, WEBP or GIF image");
    else if (f.size > maxSizeMB * 1024 * 1024) onError(`Thumbnail must be smaller than ${maxSizeMB}MB`);
    else onChange(f);
    if (inputRef.current) inputRef.current.value = "";
  };

  const shown = preview || (existing ? fileUrl(existing) : "");

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <label className="text-sm font-medium text-slate-700">
          Thumbnail image {required && <span className="text-red-500">*</span>}
        </label>
        <span className="text-xs text-slate-400">Shown on cards &amp; lists</span>
      </div>

      <div className="flex items-center gap-4">
        <div
          onClick={() => inputRef.current?.click()}
          className="relative flex aspect-[4/3] w-40 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-primary"
        >
          {shown ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={shown} alt="Thumbnail" className="h-full w-full object-cover" />
          ) : (
            <div className="text-center text-slate-400">
              <PhotoIcon className="mx-auto h-8 w-8" />
              <span className="text-xs">Choose image</span>
            </div>
          )}
          {file && <span className="absolute inset-x-0 bottom-0 bg-primary py-0.5 text-center text-[10px] text-white">New</span>}
        </div>

        <div className="flex flex-col items-start gap-2">
          <button type="button" onClick={() => inputRef.current?.click()} className="btn-secondary !py-1.5">
            <ArrowPathIcon className="h-4 w-4" /> {shown ? "Replace" : "Upload"}
          </button>
          {file && (
            <button type="button" onClick={() => onChange(null)} className="inline-flex items-center gap-1 text-xs text-red-600 hover:underline">
              <XMarkIcon className="h-4 w-4" /> Remove new image
            </button>
          )}
          <p className="text-xs text-slate-400">JPG, PNG, WEBP, GIF · max {maxSizeMB}MB</p>
        </div>
        <input ref={inputRef} type="file" hidden accept={IMAGE_TYPES.join(",")} onChange={(e) => pick(e.target.files)} />
      </div>
    </div>
  );
}
