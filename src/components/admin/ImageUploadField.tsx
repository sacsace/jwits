"use client";

import { useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

export function ImageUploadField({
  value,
  onChange,
  label = "사진",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function onFileChange(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError("");
    const body = new FormData();
    body.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "업로드에 실패했습니다.");
        return;
      }
      onChange(data.url as string);
    } catch {
      setError("업로드에 실패했습니다.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <span className="mb-1.5 block text-sm text-muted">{label}</span>
      <div className="flex flex-wrap items-start gap-4">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt=""
            className="h-20 w-20 rounded-full object-cover ring-1 ring-line"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface text-xs text-muted ring-1 ring-line">
            미리보기
          </div>
        )}
        <div className="min-w-0 flex-1 space-y-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="block w-full text-sm text-muted file:mr-3 file:rounded-md file:border-0 file:bg-[#1f3554] file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-[#172842]"
            disabled={uploading}
            onChange={(e) => onFileChange(e.target.files?.[0])}
          />
          <p className="text-xs text-muted">
            {uploading
              ? "업로드 중..."
              : "jpg, png, webp, gif · 최대 5MB · Railway 디스크에 저장"}
          </p>
          {value && (
            <button
              type="button"
              className="text-xs text-red-600 hover:underline"
              onClick={() => onChange("")}
            >
              사진 제거
            </button>
          )}
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
