import { useState, useRef, useCallback, useEffect } from "react";

const getFileIcon = (file: File): string => {
  const type = file.type;
  if (type.startsWith("image/")) return "🖼️";
  if (type.startsWith("video/")) return "🎬";
  if (type.startsWith("audio/")) return "🎵";
  if (type.includes("pdf")) return "📄";
  if (type.includes("zip") || type.includes("rar")) return "🗜️";
  if (type.includes("sheet") || type.includes("excel")) return "📊";
  if (type.includes("doc") || type.includes("word")) return "📝";
  if (type.includes("presentation") || type.includes("powerpoint")) return "📑";
  return "📎";
};

const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
};

interface FileAttachmentProps {
  onChange?: (files: File[]) => void;
  currentAttachments?: File[];
}

export default function FileAttachment({ onChange, currentAttachments }: FileAttachmentProps) {
  const [attachments, setAttachments] = useState<File[]>(currentAttachments || []);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAttachments(currentAttachments || []);
  }, [currentAttachments]);

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const newFiles = Array.from(files);
      setAttachments((prev) => {
        const existing = new Set(prev.map((f) => f.name + f.size));
        const merged = [...prev, ...newFiles.filter((f) => !existing.has(f.name + f.size))];
        onChange?.(merged);
        return merged;
      });
    },
    [onChange]
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);

  const removeFile = (idx: number) => {
    setAttachments((prev) => {
      const updated = prev.filter((_, i) => i !== idx);
      onChange?.(updated);
      return updated;
    });
  };

  const clearAll = () => { setAttachments([]); onChange?.([]); };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", width: "100%" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        .fa-wrap { width: 100%; box-sizing: border-box; }

        /* Compact inline drop zone */
        .drop-zone {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1.5px dashed #d1d5db;
          border-radius: 8px;
          padding: 10px 14px;
          cursor: pointer;
          transition: all 0.18s ease;
          background: #fafafa;
          width: 100%;
          box-sizing: border-box;
        }
        .drop-zone:hover, .drop-zone.dragging {
          border-color: #6366f1;
          background: #eef2ff;
        }
        .drop-zone.dragging {
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }
        .dz-icon {
          width: 32px;
          height: 32px;
          min-width: 32px;
          background: #e0e7ff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          transition: transform 0.18s;
        }
        .drop-zone:hover .dz-icon { transform: scale(1.1); }
        .dz-text { flex: 1; min-width: 0; text-align: left; }
        .dz-text p { margin: 0; }
        .dz-primary { font-size: 13px; font-weight: 500; color: #374151; }
        .dz-secondary { font-size: 11px; color: #9ca3af; margin-top: 1px !important; }
        .browse-link { color: #6366f1; font-weight: 600; }
        .browse-link:hover { text-decoration: underline; }

        /* Chip-style file list */
        .file-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 8px;
        }
        .file-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 8px 4px 6px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          color: #374151;
          animation: chipIn 0.15s ease;
          transition: border-color 0.15s, box-shadow 0.15s;
          max-width: 100%;
          box-sizing: border-box;
        }
        .file-chip:hover {
          border-color: #c7d2fe;
          box-shadow: 0 1px 4px rgba(99,102,241,0.1);
        }
        @keyframes chipIn {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        .chip-icon { font-size: 13px; flex-shrink: 0; }
        .chip-name {
          max-width: 140px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex-shrink: 1;
        }
        .chip-size { color: #9ca3af; font-weight: 400; white-space: nowrap; flex-shrink: 0; }
        .chip-remove {
          width: 16px;
          height: 16px;
          min-width: 16px;
          border-radius: 50%;
          border: none;
          background: #f3f4f6;
          color: #6b7280;
          cursor: pointer;
          font-size: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.12s, color 0.12s;
          padding: 0;
          flex-shrink: 0;
        }
        .chip-remove:hover { background: #fee2e2; color: #ef4444; }

        /* Footer row */
        .fa-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 6px;
        }
        .file-count-badge {
          font-size: 11px;
          font-weight: 600;
          color: #6366f1;
          background: #eef2ff;
          padding: 2px 8px;
          border-radius: 20px;
        }
        .clear-all {
          font-size: 11px;
          color: #9ca3af;
          cursor: pointer;
          border: none;
          background: none;
          padding: 0;
          transition: color 0.15s;
        }
        .clear-all:hover { color: #ef4444; }

        /* Responsive: on very small screens truncate chip names less aggressively */
        @media (max-width: 360px) {
          .chip-name { max-width: 80px; }
          .chip-size { display: none; }
        }
      `}</style>

      <div className="fa-wrap">
        {/* Compact Drop Zone */}
        <div
          className={`drop-zone${isDragging ? " dragging" : ""}`}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onClick={() => inputRef.current?.click()}
        >
          <div className="dz-icon">📎</div>
          <div className="dz-text">
            <p className="dz-primary">
              Drop files or <span className="browse-link">browse</span>
            </p>
            <p className="dz-secondary">Any file type supported</p>
          </div>
          {attachments.length > 0 && (
            <span className="file-count-badge">
              {attachments.length} file{attachments.length !== 1 ? "s" : ""}
            </span>
          )}
          <input
            ref={inputRef}
            type="file"
            multiple
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files) addFiles(e.target.files);
              e.target.value = "";
            }}
            style={{ display: "none" }}
          />
        </div>

        {/* Chip-style file list */}
        {attachments.length > 0 && (
          <>
            <div className="file-chips">
              {attachments.map((file, idx) => (
                <div className="file-chip" key={`${file.name}-${file.size}-${idx}`}>
                  <span className="chip-icon">{getFileIcon(file)}</span>
                  <span className="chip-name" title={file.name}>{file.name}</span>
                  <span className="chip-size">{formatSize(file.size)}</span>
                  <button
                    className="chip-remove"
                    onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="fa-footer">
              <span />
              <button className="clear-all" onClick={clearAll}>Clear all</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}