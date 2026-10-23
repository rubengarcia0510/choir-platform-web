import { describe, expect, it } from 'vitest';
import * as sass from 'sass';

describe('Reduced motion styles', () => {
  it('disables decorative animations and transitions when reduced motion is preferred', () => {
    const result = sass.compile('src/app/app.scss');

    expect(result.css).toContain(
      '@media (prefers-reduced-motion: reduce)',
    );
  });
});
