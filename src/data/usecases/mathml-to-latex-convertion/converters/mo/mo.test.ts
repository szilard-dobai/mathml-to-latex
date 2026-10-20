import { MO } from './mo';
import { MathMLElement } from '../../../../protocols/mathml-element';

const mo = (value: string): MathMLElement => ({ name: 'mo', value, children: [], attributes: {} });

describe('MO', () => {
  it.each([
    ['returns a simple operator as-is', '+', '+'],
    ['maps a known operator glyph to its command', '∑', '\\sum'],
    ['trims surrounding whitespace', '  =  ', '='],
    ['maps a thin space to its spacing command', '\u2009', '\\,'],
    ['maps a no-break space to a tie', '\u00A0', '~'],
    ['maps every space of a run of spaces', '\u2003\u2003', '\\quad\\quad'],
    ['ignores XML whitespace around a space character', ' \u2009\n', '\\,'],
    ['keeps an operator padded with space characters', '\u00A0=\u00A0', '='],
  ])('%s', (_name, value, expected) => {
    expect(new MO(mo(value)).convert()).toBe(expected);
  });
});
