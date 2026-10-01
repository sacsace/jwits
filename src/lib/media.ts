/** Client-safe media URL helpers (no Node fs). */
export function isVideoUrl(url: string) {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url);
}
