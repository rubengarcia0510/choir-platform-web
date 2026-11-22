import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HomePage } from './pages';

describe('HomePage - accesibilidad de la ilustración CHOIR-139', () => {
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
  });

  it('excluye la ilustración decorativa del árbol accesible', () => {
    const illustration = (
      fixture.nativeElement as HTMLElement
    ).querySelector('.hero-art');

    expect(illustration).not.toBeNull();
    expect(illustration?.getAttribute('aria-hidden')).toBe('true');
    expect(illustration?.hasAttribute('aria-label')).toBe(false);
  });

  it('conserva el contenido textual que comunica el propósito de la página', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent)
      .toContain('Cada voz importa.');

    expect(element.querySelector('.hero-description')?.textContent)
      .toContain('Organizá tu coro');

    expect(element.querySelectorAll('.feature-card')).toHaveLength(3);
  });
});
