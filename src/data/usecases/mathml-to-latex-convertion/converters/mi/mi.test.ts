import { MI } from './mi';
import { MathMLElement } from '../../../../protocols/mathml-element';

const mi = (value: string, attributes: Record<string, string> = {}): MathMLElement => ({
  name: 'mi',
  value,
  children: [],
  attributes,
});

describe('MI', () => {
  it('returns a plain identifier unchanged', () => {
    expect(new MI(mi('x')).convert()).toBe('x');
  });

  it('wraps the value in the font command of the mathvariant', () => {
    expect(new MI(mi('x', { mathvariant: 'bold' })).convert()).toBe('\\mathbf{x}');
  });

  it('ignores an unknown mathvariant', () => {
    expect(new MI(mi('x', { mathvariant: 'nonsense' })).convert()).toBe('x');
  });

  it.each([
    ['without a mathvariant', {}],
    ['with the normal mathvariant', { mathvariant: 'normal' }],
  ])('renders a multi-character identifier upright %s', (_name, attributes) => {
    expect(new MI(mi('cm', attributes)).convert()).toBe('\\mathrm{cm}');
  });

  it('renders a multi-character identifier naming a LaTeX operator as its command', () => {
    expect(new MI(mi('sin')).convert()).toBe('\\sin');
  });

  it('keeps an explicit mathvariant on a multi-character identifier', () => {
    expect(new MI(mi('ab', { mathvariant: 'italic' })).convert()).toBe('\\mathit{ab}');
  });
});
