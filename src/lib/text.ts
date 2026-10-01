/** Word-wise: first letter upper, rest lower. Keeps hyphens/parentheses. */
export function toNameCase(value: string) {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((word) => {
      if (!word) return word;
      return word
        .split("-")
        .map((part) => {
          if (!part) return part;
          // keep short ALL-CAPS tokens like (KIN) handled via outer chars
          const match = part.match(/^(\()?(.*?)(\))?$/);
          if (!match) {
            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
          }
          const [, open = "", core = "", close = ""] = match;
          if (!core) return part;
          const cased =
            core.charAt(0).toUpperCase() + core.slice(1).toLowerCase();
          return `${open}${cased}${close}`;
        })
        .join("-");
    })
    .join(" ");
}
