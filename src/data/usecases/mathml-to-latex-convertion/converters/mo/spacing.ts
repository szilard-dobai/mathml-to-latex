import { ownLookup } from '../../../../helpers';
import { mathSpacesByChar } from '../../../../../syntax';

/**
 * Resolves an operator made only of unicode space characters to LaTeX spacing
 * commands. Surrounding XML whitespace is ignored, as MathML trims it.
 *
 * @example
 * // &#x2009; -> \,
 * // &#xA0;&#xA0; -> ~~
 */
export class Spacing {
  private readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  /** @returns the spacing commands, or undefined when the value is not made only of known space characters. */
  static apply(value: string): string | undefined {
    return new Spacing(value)._apply();
  }

  private _apply(): string | undefined {
    const characters = [...this._value.replace(XML_WHITESPACE, '')];
    if (characters.length === 0) return undefined;

    const commands = characters.map((character) => ownLookup(mathSpacesByChar, character));
    if (commands.some((command) => command === undefined)) return undefined;

    return commands.join('');
  }
}

const XML_WHITESPACE = /[ \t\n\r]/g;
