import { ToLaTeXConverter } from '../../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../../protocols/mathml-element';
import { normalizeWhiteSpaces } from '../../../../helpers';
import { Operator } from './operator';
import { Spacing } from './spacing';

/**
 * Converts a MathML `<mo>` (operator) element into LaTeX.
 *
 * Normalizes/trims the value and resolves it to a LaTeX command through the
 * operator lookup tables, falling back to UTF-8 conversion. An operator made
 * only of unicode space characters becomes LaTeX spacing instead.
 *
 * @example
 * // <mo>&#x2211;</mo> -> \sum
 * // <mo>&#x2009;</mo> -> \,
 */
export class MO implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  /**
   * @returns the LaTeX representation of this element.
   */
  convert(): string {
    const spacing = Spacing.apply(this._mathmlElement.value);
    if (spacing !== undefined) return spacing;

    const normalizedValue = normalizeWhiteSpaces(this._mathmlElement.value);
    const trimmedValue = normalizedValue.trim();

    return Operator.operate(trimmedValue);
  }
}
