/** Word-wise: first letter upper, rest lower. Keeps -/~/+/& and parentheses. */
export function toNameCase(value: string) {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((word) => titleWord(word))
    .join(" ");
}

function titleSegment(segment: string) {
  if (!segment) return segment;
  const match = segment.match(/^(\()?(.*?)(\))?$/);
  if (!match) {
    return segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase();
  }
  const [, open = "", core = "", close = ""] = match;
  if (!core) return segment;
  const cased = core.charAt(0).toUpperCase() + core.slice(1).toLowerCase();
  return `${open}${cased}${close}`;
}

function titleWord(word: string) {
  if (!word) return word;
  return word
    .split(/([-/~+&])/)
    .map((part) => (/^[-/~+&]$/.test(part) ? part : titleSegment(part)))
    .join("");
}
