import { describe, expect, it } from 'vitest';
import * as sass from 'sass';

describe('Reduced motion styles', () => {
  it('disables transitions and hover transforms when reduced motion is preferred', () => {
    const result = sass.compile('src/app/app.scss');

    expect(result.css).toMatch(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{\s*\.main-nav a,\s*\.login-link,\s*\.button,\s*\.feature-card\s*\{\s*transition:\s*none;\s*\}\s*\.button:hover,\s*\.feature-card:hover\s*\{\s*transform:\s*none;\s*\}\s*\}/,
    );
  });
});
