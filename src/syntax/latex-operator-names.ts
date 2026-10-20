/**
 * Function names LaTeX typesets upright through a dedicated command (e.g.
 * `\sin`). Consumed by the `<mi>` converter so a multi-character identifier
 * naming one of them becomes that command instead of a generic `\mathrm{...}`.
 */
export const latexOperatorNames = [
  'arccos',
  'arcsin',
  'arctan',
  'arg',
  'cos',
  'cosh',
  'cot',
  'coth',
  'csc',
  'deg',
  'det',
  'dim',
  'exp',
  'gcd',
  'hom',
  'inf',
  'ker',
  'lg',
  'lim',
  'liminf',
  'limsup',
  'ln',
  'log',
  'max',
  'min',
  'Pr',
  'sec',
  'sin',
  'sinh',
  'sup',
  'tan',
  'tanh',
];
