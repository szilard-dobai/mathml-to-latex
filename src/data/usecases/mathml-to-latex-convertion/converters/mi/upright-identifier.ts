import { latexOperatorNames } from '../../../../../syntax';

/**
 * Renders an identifier upright: a name LaTeX knows as an operator becomes its
 * command, anything else is wrapped in `\mathrm`.
 *
 * @example
 * // sin -> \sin
 * // cm -> \mathrm{cm}
 */
export class UprightIdentifier {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  static apply(value: string): string {
    return new UprightIdentifier(value)._apply();
  }

  private _apply(): string {
    if (latexOperatorNames.includes(this._value)) return `\\${this._value}`;
    return `\\mathrm{${this._value}}`;
  }
}
