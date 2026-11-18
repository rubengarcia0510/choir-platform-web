import { TestBed } from '@angular/core/testing';

import { FormationStageComponent } from './formation-stage.component';
import { FormationStageSinger } from './formation-stage.model';

describe('FormationStageComponent keyboard Tab cancellation', () => {
  const singer: FormationStageSinger = {
    id: 7,
    displayName: 'Ana Prueba',
    positionId: 60,
    locked: false,
    x: 30,
    y: 40,
    sectionLabel: 'Soprano',
    sectionHue: 250,
  };

  it('cancela el movimiento al presionar Tab sin impedir la navegación ni emitir cambios', async () => {
    await TestBed.configureTestingModule({
      imports: [FormationStageComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(FormationStageComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('singers', [singer]);
    fixture.componentRef.setInput('hasDraft', true);
    fixture.componentRef.setInput('canEdit', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.stage-person') as HTMLButtonElement;
    const emitted = vi.fn();

    component.positionChanged.subscribe(emitted);

    button.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        cancelable: true,
      }),
    );

    button.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        bubbles: true,
        cancelable: true,
      }),
    );

    const tabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      cancelable: true,
    });

    button.dispatchEvent(tabEvent);

    expect(component.keyboardMoveSession()).toBeNull();
    expect(component.displayX(singer)).toBe(30);
    expect(emitted).not.toHaveBeenCalled();
    expect(tabEvent.defaultPrevented).toBe(false);
    expect(component.keyboardAnnouncement).toContain('cancelado');
  });
});
