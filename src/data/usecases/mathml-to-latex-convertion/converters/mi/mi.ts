import { ToLaTeXConverter } from '../../../../../domain/usecases/to-latex-converter';
import { MathMLElement } from '../../../../protocols/mathml-element';
import { normalizeWhiteSpaces } from '../../../../helpers';
import { UTF8ToLtXConverter } from 'data/protocols';
import { HashUTF8ToLtXConverter } from '../../../../../syntax/utf8-converter';
import { Character } from './character';
import { UprightIdentifier } from './upright-identifier';

/**
 * Converts a MathML `<mi>` (identifier) element into LaTeX.
 *
 * Maps known math symbols/glyphs to their LaTeX commands (falling back to UTF-8
 * conversion), then wraps the result according to the `mathvariant` attribute.
 * An identifier of more than one character defaults to upright, as in MathML.
 *
 * @example
 * // <mi mathvariant="bold">x</mi> -> \mathbf{x}
 * // <mi>sin</mi> -> \sin
 */
export class MI implements ToLaTeXConverter {
  private readonly _mathmlElement: MathMLElement;

  private readonly utf8Converter: UTF8ToLtXConverter = new HashUTF8ToLtXConverter();

  constructor(mathElement: MathMLElement) {
    this._mathmlElement = mathElement;
  }

  /**
   * @returns the LaTeX representation of this element.
   */
  convert(): string {
    const normalizedValue = normalizeWhiteSpaces(this._mathmlElement.value);
    if (normalizedValue === ' ') return Character.apply(normalizedValue);

    const trimmedValue = normalizedValue.trim();
    const convertedChar = Character.apply(trimmedValue);

    const parsedChar = this.utf8Converter.convert(convertedChar);
    if (parsedChar !== convertedChar) return parsedChar;

    const mathVariant = this.getMathVariant(this._mathmlElement.attributes);
    if (this.isUpright(trimmedValue, mathVariant)) return UprightIdentifier.apply(convertedChar);

    return this.wrapInMathVariant(convertedChar, mathVariant);
  }

  /**
   * MathML renders an identifier of more than one character with the `normal`
   * (upright) variant unless told otherwise, unlike a single character, which
   * defaults to italic.
   */
  private isUpright(value: string, mathVariant: string | undefined): boolean {
    return [...value].length > 1 && (mathVariant === undefined || mathVariant === 'normal');
  }

  /** Extracts the `mathvariant` attribute value, or undefined when absent. */
  private getMathVariant(attributes: Record<string, unknown> | undefined) {
    if (!attributes || !attributes.mathvariant) return undefined;
    return attributes.mathvariant as string;
  }

  /** Wraps the value in the LaTeX font command matching the given `mathvariant`. */
  private wrapInMathVariant(value: string, mathVariant: string | undefined) {
    switch (mathVariant) {
      case 'bold':
        return `\\mathbf{${value}}`;
      case 'italic':
        return `\\mathit{${value}}`;
      case 'bold-italic':
        return `\\mathbf{\\mathit{${value}}}`;
      case 'double-struck':
        return `\\mathbb{${value}}`;
      case 'bold-fraktur':
        return `\\mathbf{\\mathfrak{${value}}}`;
      case 'script':
        return `\\mathcal{${value}}`;
      case 'bold-script':
        return `\\mathbf{\\mathcal{${value}}}`;
      case 'fraktur':
        return `\\mathfrak{${value}}`;
      case 'sans-serif':
        return `\\mathsf{${value}}`;
      case 'bold-sans-serif':
        return `\\mathbf{\\mathsf{${value}}}`;
      case 'sans-serif-italic':
        return `\\mathsf{\\mathit{${value}}}`;
      case 'sans-serif-bold-italic':
        return `\\mathbf{\\mathsf{\\mathit{${value}}}}`;
      case 'monospace':
        return `\\mathtt{${value}}`;
      default:
        return value;
    }
  }
}
