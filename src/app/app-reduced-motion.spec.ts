import { describe, expect, it } from 'vitest';
import * as sass from 'sass';

describe('Reduced motion styles', () => {
  it('disables transitions and hover transforms when reduced motion is preferred', () => {
    const result = sass.compile('src/app/pages.scss');
    const reducedMotionBlock = result.css.match(
      /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*)\}\s*$/,
    );

    expect(reducedMotionBlock).not.toBeNull();

    const styles = reducedMotionBlock?.[1] ?? '';

    expect(styles).toContain('app-root .main-nav a');
    expect(styles).toContain('app-root .login-link');
    expect(styles).toContain('transition: none');
    expect(styles).toContain('app-root .button:hover');
    expect(styles).toContain('app-root .feature-card:hover');
    expect(styles).toContain('transform: none');
  });
});
