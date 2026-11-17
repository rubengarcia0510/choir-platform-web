import { TestBed } from '@angular/core/testing';

import { FormationStageComponent } from './formation-stage.component';
import { FormationStageSinger } from './formation-stage.model';

describe('FormationStageComponent keyboard positioning', () => {
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

  async function createComponent(
    overrides: {
      canEdit?: boolean;
      saving?: boolean;
      draftLoading?: boolean;
      singers?: FormationStageSinger[];
      pendingPositionIds?: number[];
    } = {},
  ) {
    await TestBed.configureTestingModule({
      imports: [FormationStageComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(FormationStageComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('singers', overrides.singers ?? [singer]);
    fixture.componentRef.setInput('hasDraft', true);
    fixture.componentRef.setInput('canEdit', overrides.canEdit ?? true);
    fixture.componentRef.setInput('saving', overrides.saving ?? false);
    fixture.componentRef.setInput('draftLoading', overrides.draftLoading ?? false);
    fixture.componentRef.setInput('pendingPositionIds', overrides.pendingPositionIds ?? []);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.stage-person') as HTMLButtonElement;

    return { fixture, component, button };
  }

  function press(button: HTMLButtonElement, key: string, shiftKey = false): void {
    button.dispatchEvent(
      new KeyboardEvent('keydown', {
        key,
        shiftKey,
        bubbles: true,
        cancelable: true,
      }),
    );
  }

  it('inicia el movimiento con Enter y anuncia las instrucciones', async () => {
    const { component, button } = await createComponent();

    press(button, 'Enter');

    expect(component.keyboardMoveSession()?.singerId).toBe(7);
    expect(component.keyboardAnnouncement).toContain('Usá las flechas');
  });

  it('mueve con flechas y confirma emitiendo la nueva posición', async () => {
    const { component, button, fixture } = await createComponent();
    const emitted = vi.fn();

    component.positionChanged.subscribe(emitted);

    press(button, 'Enter');
    press(button, 'ArrowRight');
    press(button, 'ArrowDown');
    fixture.detectChanges();

    const wrapper = fixture.nativeElement.querySelector('.stage-person-wrapper') as HTMLElement;

    expect(wrapper.style.left).toBe('31%');
    expect(wrapper.style.top).toBe('41%');

    press(button, 'Enter');

    expect(emitted).toHaveBeenCalledWith({
      singerId: 7,
      x: 31,
      y: 41,
    });
    expect(component.keyboardMoveSession()).toBeNull();
  });

  it('usa pasos mayores con Shift y respeta los límites', async () => {
    const { component, button } = await createComponent();

    press(button, 'Enter');
    press(button, 'ArrowRight', true);
    press(button, 'ArrowUp', true);

    expect(component.displayX(singer)).toBe(35);
    expect(component.displayY(singer)).toBe(35);

    for (let i = 0; i < 20; i++) {
      press(button, 'ArrowRight', true);
      press(button, 'ArrowUp', true);
    }

    expect(component.displayX(singer)).toBe(95);
    expect(component.displayY(singer)).toBe(8);
  });

  it('cancela con Escape sin emitir cambios', async () => {
    const { component, button } = await createComponent();
    const emitted = vi.fn();

    component.positionChanged.subscribe(emitted);

    press(button, 'Enter');
    press(button, 'ArrowRight');
    press(button, 'Escape');

    expect(component.keyboardMoveSession()).toBeNull();
    expect(component.displayX(singer)).toBe(30);
    expect(emitted).not.toHaveBeenCalled();
    expect(component.keyboardAnnouncement).toContain('cancelado');
  });

  it('no permite mover integrantes bloqueados', async () => {
    const lockedSinger = { ...singer, locked: true };
    const { component, button } = await createComponent({
      singers: [lockedSinger],
    });

    press(button, 'Enter');

    expect(component.keyboardMoveSession()).toBeNull();
    expect(component.keyboardAnnouncement).toContain('bloqueada');
  });

  it('no permite iniciar el movimiento cuando no se puede editar', async () => {
    const { component, button } = await createComponent({ canEdit: false });

    press(button, 'Enter');

    expect(component.keyboardMoveSession()).toBeNull();
  });

  it('no permite iniciar el movimiento mientras se guarda o carga el borrador', async () => {
    const { fixture, component, button } = await createComponent({ saving: true });

    press(button, 'Enter');
    expect(component.keyboardMoveSession()).toBeNull();

    fixture.componentRef.setInput('saving', false);
    fixture.componentRef.setInput('draftLoading', true);
    fixture.detectChanges();

    press(button, 'Enter');
    expect(component.keyboardMoveSession()).toBeNull();
  });

  it('no permite mover una posición con una operación de bloqueo pendiente', async () => {
    const { component, button } = await createComponent({
      pendingPositionIds: [60],
    });

    press(button, 'Enter');

    expect(component.keyboardMoveSession()).toBeNull();
  });

  it('confirma sin emitir cuando no hubo desplazamiento', async () => {
    const { component, button } = await createComponent();
    const emitted = vi.fn();

    component.positionChanged.subscribe(emitted);

    press(button, 'Enter');
    press(button, 'Enter');

    expect(emitted).not.toHaveBeenCalled();
    expect(component.keyboardMoveSession()).toBeNull();
  });
});
