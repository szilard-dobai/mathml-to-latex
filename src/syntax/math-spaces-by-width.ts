/**
 * LaTeX spacing commands paired with their width in em. Consumed by the
 * `<mspace>` converter to translate a `width` attribute back into the command
 * that produces it (e.g. MathJax writes `\,` as `width="0.167em"`).
 */
export const mathSpacesByEmWidth: [number, string][] = [
  [-3 / 18, '\\!'],
  [3 / 18, '\\,'],
  [4 / 18, '\\:'],
  [5 / 18, '\\;'],
  [0.5, '\\enspace'],
  [1, '\\quad'],
  [2, '\\qquad'],
];

/**
 * MathML named space widths, keyed by name, in em. Deprecated in MathML Core
 * but still emitted by older tools (e.g. `width="thinmathspace"`).
 */
export const namedMathSpaceEmWidths: Record<string, number> = {
  veryverythinmathspace: 1 / 18,
  verythinmathspace: 2 / 18,
  thinmathspace: 3 / 18,
  mediummathspace: 4 / 18,
  thickmathspace: 5 / 18,
  verythickmathspace: 6 / 18,
  veryverythickmathspace: 7 / 18,
  negativeveryverythinmathspace: -1 / 18,
  negativeverythinmathspace: -2 / 18,
  negativethinmathspace: -3 / 18,
  negativemediummathspace: -4 / 18,
  negativethickmathspace: -5 / 18,
  negativeverythickmathspace: -6 / 18,
  negativeveryverythickmathspace: -7 / 18,
};
