import { MSpace } from './mspace';
import { MathMLElement } from '../../../protocols/mathml-element';

const mspace = (attributes: Record<string, string> = {}): MathMLElement => ({
  name: 'mspace',
  value: '',
  children: [],
  attributes,
});

describe('MSpace', () => {
  it('emits a LaTeX line break for linebreak="newline"', () => {
    expect(new MSpace(mspace({ linebreak: 'newline' })).convert()).toBe(' \\\\ ');
  });

  it('emits a single space otherwise', () => {
    expect(new MSpace(mspace()).convert()).toBe(' ');
  });

  it.each([
    ['0.167em', '\\,'],
    ['0.1667em', '\\,'],
    ['.2222em', '\\:'],
    ['0.278em', '\\;'],
    ['-0.167em', '\\!'],
    ['0.5em', '\\enspace'],
    ['1em', '\\quad'],
    ['2em', '\\qquad'],
    ['thinmathspace', '\\,'],
    ['negativethinmathspace', '\\!'],
  ])('emits the spacing command of width="%s"', (width, expected) => {
    expect(new MSpace(mspace({ width })).convert()).toBe(expected);
  });

  it.each(['0.4em', '5px', 'veryverythinmathspace', 'constructor'])(
    'emits a single space for width="%s", which has no LaTeX equivalent',
    (width) => {
      expect(new MSpace(mspace({ width })).convert()).toBe(' ');
    },
  );
});
