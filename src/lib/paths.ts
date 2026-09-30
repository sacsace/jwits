import path from "path";

/** Persistent data root. On Railway, mount volume at /app/data. */
export function getDataDir() {
  return (
    process.env.DATA_DIR ||
    process.env.RAILWAY_VOLUME_MOUNT_PATH ||
    path.join(process.cwd(), "data")
  );
}

export function getUploadsDir() {
  return path.join(getDataDir(), "uploads");
}
