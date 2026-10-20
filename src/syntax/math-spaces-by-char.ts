/**
 * Lookup table mapping unicode space characters, keyed by character, to the
 * closest LaTeX spacing command. MathML keeps these characters as token content
 * (only XML whitespace is trimmed), and editors such as MathType emit them as
 * `<mo>` operators. Consumed by the `<mo>` converter.
 */
export const mathSpacesByChar: Record<string, string> = {
  ' ': '~',
  ' ': '\\enspace',
  ' ': '\\quad',
  ' ': '\\enspace',
  ' ': '\\quad',
  ' ': '\\;',
  ' ': '\\:',
  ' ': '\\,',
  ' ': '\\,',
  ' ': '\\,',
  ' ': '\\,',
  ' ': '\\:',
};
