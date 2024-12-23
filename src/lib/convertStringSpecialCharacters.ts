const CHAR_CODES_LOOKUP_TABLE = [
  ["&", "&amp;"],
  ["#", "&num;"],
  ["'", "&apos;"],
  ['"', "&quot;"],
  ["<", "&lt;"],
  [">", "&gt;"],
  ["\\", "&bsol;"],
];

export function convertSpecialCharactersToCodes(text: string | undefined) {
  if (!text) return "";
  let result = text;
  for (let i = 0; i < CHAR_CODES_LOOKUP_TABLE.length; i++) {
    result = result.replaceAll(
      CHAR_CODES_LOOKUP_TABLE[i][0],
      CHAR_CODES_LOOKUP_TABLE[i][1],
    );
  }

  return result;
}

export function convertCodesToSpecialCharacters(text: string | undefined) {
  if (!text) return "";
  let result = text;
  for (let i = 0; i < CHAR_CODES_LOOKUP_TABLE.length; i++) {
    result = result.replaceAll(
      CHAR_CODES_LOOKUP_TABLE[i][1],
      CHAR_CODES_LOOKUP_TABLE[i][0],
    );
  }

  return result;
}
