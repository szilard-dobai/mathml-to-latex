import { ToLaTeXConverter } from '../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../protocols/mathml-element';
import { ownLookup } from '../../../helpers';
import { mathSpacesByEmWidth, namedMathSpaceEmWidths } from '../../../../syntax';

/**
 * Converts a MathML `<mspace>` element into LaTeX.
 *
 * Emits a LaTeX line break when `linebreak="newline"`, the spacing command of a
 * standard `width`, and otherwise a single space.
 *
 * @example
 * // <mspace linebreak="newline" /> ->  \\
 * // <mspace width="0.167em" /> -> \,
 */
export class MSpace implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  /**
   * @returns the LaTeX representation of this element.
   */
  convert(): string {
    const { linebreak, width } = this._mathmlElement.attributes;

    if (linebreak === 'newline') {
      return ' \\\\ ';
    }

    return SpaceWidth.toLaTeX(width) ?? ' ';
  }
}

/**
 * Matches an `<mspace>` width, given in em or as a MathML named space, to the
 * LaTeX spacing command of that width. Widths are compared with a small
 * tolerance, since tools round them differently (`0.167em`, `0.1667em`).
 */
class SpaceWidth {
  private readonly _width: string;

  constructor(width: string) {
    this._width = width;
  }

  /** @returns the spacing command, or undefined when the width has no LaTeX equivalent. */
  static toLaTeX(width: string | undefined): string | undefined {
    if (!width) return undefined;
    return new SpaceWidth(width)._toLaTeX();
  }

  private _toLaTeX(): string | undefined {
    const em = this._inEm();
    if (em === undefined) return undefined;

    return mathSpacesByEmWidth.find(([commandEm]) => Math.abs(commandEm - em) < EM_TOLERANCE)?.[1];
  }

  private _inEm(): number | undefined {
    const width = this._width.trim();

    const namedWidth = ownLookup(namedMathSpaceEmWidths, width);
    if (namedWidth !== undefined) return namedWidth;

    const emWidth = width.match(EM_WIDTH);
    return emWidth ? Number(emWidth[1]) : undefined;
  }
}

const EM_WIDTH = /^(-?(?:\d+(?:\.\d*)?|\.\d+))em$/;
const EM_TOLERANCE = 0.01;
