import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { FormationStageComponent } from './formation-stage.component';
import { FormationStageSinger } from './formation-stage.model';

describe('FormationStageComponent', () => {
  let fixture: ReturnType<typeof TestBed.createComponent<FormationStageComponent>>;
  let component: FormationStageComponent;

  const singers: FormationStageSinger[] = [
    {
      id: 7,
      displayName: 'Ana Prueba',
      positionId: 60,
      locked: false,
      x: 30,
      y: 40,
      sectionLabel: 'Soprano',
      sectionHue: 250
    },
    {
      id: 8,
      displayName: 'Bea Prueba',
      positionId: 61,
      locked: true,
      x: 70,
      y: 40,
      sectionLabel: 'Contralto',
      sectionHue: 180
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationStageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FormationStageComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('singers', singers);
    fixture.componentRef.setInput('directorName', 'Rosa Directora');
    fixture.componentRef.setInput('hasDraft', true);
    fixture.componentRef.setInput('canEdit', true);

    fixture.detectChanges();
  });

  function pointerEvent(
    currentTarget: HTMLElement,
    pointerId: number,
    clientX: number,
    clientY: number
  ): PointerEvent {
    return {
      currentTarget,
      pointerId,
      clientX,
      clientY,
      button: 0,
      preventDefault: vi.fn()
    } as unknown as PointerEvent;
  }

  function configureStageBounds(): HTMLElement {
    const stage = fixture.nativeElement.querySelector(
      '.stage'
    ) as HTMLElement;

    vi.spyOn(stage, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      left: 0,
      top: 0,
      right: 500,
      bottom: 300,
      width: 500,
      height: 300,
      toJSON: () => ({})
    } as DOMRect);

    return stage;
  }

  function firstSingerButton(): HTMLButtonElement {
    const button = fixture.nativeElement.querySelector(
      '.singer-position'
    ) as HTMLButtonElement;

    if (!button) {
      throw new Error('No se encontró el botón del cantante.');
    }

    return button;
  }

  it('renderiza el escenario, el director y los cantantes', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.stage')).toBeTruthy();
    expect(element.querySelector('.stage-director')?.textContent)
      .toContain('Rosa Directora');
    expect(element.querySelectorAll('.stage-person')).toHaveLength(2);
    expect(element.textContent).toContain('Ana Prueba');
    expect(element.textContent).toContain('Bea Prueba');
    expect(element.textContent).toContain('Soprano');
    expect(element.textContent).toContain('Contralto');
  });

  it('muestra el estado de carga', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Cargando escenario');
    expect(fixture.nativeElement.querySelector('.stage')).toBeNull();
  });

  it('muestra un error y permite reintentar', () => {
    const retry = vi.spyOn(component.retry, 'emit');

    fixture.componentRef.setInput(
      'error',
      'No se pudo cargar el elenco.'
    );
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent)
      .toContain('No se pudo cargar el elenco.');

    const button = fixture.nativeElement.querySelector(
      '.stage-error button'
    ) as HTMLButtonElement;

    button.click();

    expect(retry).toHaveBeenCalledOnce();
  });

  it('muestra un mensaje cuando no existe un borrador', () => {
    fixture.componentRef.setInput('hasDraft', false);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent)
      .toContain('Seleccioná o creá una formación');
    expect(fixture.nativeElement.querySelector('.stage')).toBeNull();
  });

  it('no permite arrastrar una posición bloqueada', () => {
    const button = fixture.nativeElement.querySelectorAll(
      '.singer-position'
    )[1] as HTMLButtonElement;

    const setPointerCapture = vi.fn();
    button.setPointerCapture = setPointerCapture;

    const event = pointerEvent(button, 10, 100, 100);

    component.startDrag(event, singers[1]);

    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(setPointerCapture).not.toHaveBeenCalled();
  });

  it('emite la nueva posición al finalizar un arrastre', () => {
    configureStageBounds();

    const button = firstSingerButton();
    const setPointerCapture = vi.fn();
    const hasPointerCapture = vi.fn().mockReturnValue(true);
    const releasePointerCapture = vi.fn();

    button.setPointerCapture = setPointerCapture;
    button.hasPointerCapture = hasPointerCapture;
    button.releasePointerCapture = releasePointerCapture;

    const positionChanged = vi.spyOn(component.positionChanged, 'emit');

    component.startDrag(
      pointerEvent(button, 11, 100, 100),
      singers[0]
    );

    component.moveSinger(
      pointerEvent(button, 11, 150, 130)
    );

    component.endDrag(
      pointerEvent(button, 11, 150, 130)
    );

    expect(setPointerCapture).toHaveBeenCalledWith(11);
    expect(hasPointerCapture).toHaveBeenCalledWith(11);
    expect(releasePointerCapture).toHaveBeenCalledWith(11);

    expect(positionChanged).toHaveBeenCalledWith({
      singerId: 7,
      x: 40,
      y: 50
    });
  });

  it('no emite un cambio cuando el arrastre termina en la posición original', () => {
    const button = firstSingerButton();
    button.setPointerCapture = vi.fn();
    button.hasPointerCapture = vi.fn().mockReturnValue(true);
    button.releasePointerCapture = vi.fn();

    const positionChanged = vi.spyOn(component.positionChanged, 'emit');

    component.startDrag(
      pointerEvent(button, 12, 100, 100),
      singers[0]
    );

    component.endDrag(
      pointerEvent(button, 12, 100, 100)
    );

    expect(positionChanged).not.toHaveBeenCalled();
  });

  it('cancela el arrastre sin emitir cambios', () => {
    const button = firstSingerButton();
    button.setPointerCapture = vi.fn();

    const positionChanged = vi.spyOn(component.positionChanged, 'emit');

    component.startDrag(
      pointerEvent(button, 13, 100, 100),
      singers[0]
    );

    component.cancelDrag(
      pointerEvent(button, 13, 120, 120)
    );

    component.endDrag(
      pointerEvent(button, 13, 120, 120)
    );

    expect(positionChanged).not.toHaveBeenCalled();
  });

  it('ignora movimientos de otro puntero', () => {
    configureStageBounds();

    const button = firstSingerButton();
    button.setPointerCapture = vi.fn();

    const positionChanged = vi.spyOn(component.positionChanged, 'emit');

    component.startDrag(
      pointerEvent(button, 14, 100, 100),
      singers[0]
    );

    component.moveSinger(
      pointerEvent(button, 99, 300, 200)
    );

    component.endDrag(
      pointerEvent(button, 14, 100, 100)
    );

    expect(positionChanged).not.toHaveBeenCalled();
  });

  it('limita las posiciones a los límites del escenario', () => {
    configureStageBounds();

    const button = firstSingerButton();
    button.setPointerCapture = vi.fn();
    button.hasPointerCapture = vi.fn().mockReturnValue(true);
    button.releasePointerCapture = vi.fn();

    const positionChanged = vi.spyOn(component.positionChanged, 'emit');

    component.startDrag(
      pointerEvent(button, 15, 100, 100),
      singers[0]
    );

    component.moveSinger(
      pointerEvent(button, 15, 10000, 10000)
    );

    component.endDrag(
      pointerEvent(button, 15, 10000, 10000)
    );

    expect(positionChanged).toHaveBeenCalledWith({
      singerId: 7,
      x: 100,
      y: 100
    });
  });

  it('emite la solicitud de bloqueo', () => {
    const toggleLock = vi.spyOn(component.toggleLock, 'emit');

    component.requestLockToggle(singers[0]);

    expect(toggleLock).toHaveBeenCalledWith(singers[0]);
  });

  it('no solicita el bloqueo si la posición no existe', () => {
    const toggleLock = vi.spyOn(component.toggleLock, 'emit');

    component.requestLockToggle({
      ...singers[0],
      positionId: null
    });

    expect(toggleLock).not.toHaveBeenCalled();
  });

  it('no solicita el bloqueo si ya existe una mutación pendiente', () => {
    fixture.componentRef.setInput('pendingPositionIds', [60]);

    const toggleLock = vi.spyOn(component.toggleLock, 'emit');

    component.requestLockToggle(singers[0]);

    expect(toggleLock).not.toHaveBeenCalled();
  });

  it('emite la solicitud de eliminación', () => {
    const removeSinger = vi.spyOn(component.removeSinger, 'emit');

    component.requestRemoval(7);

    expect(removeSinger).toHaveBeenCalledWith(7);
  });

  it('no permite eliminar integrantes durante el guardado', () => {
    fixture.componentRef.setInput('saving', true);

    const removeSinger = vi.spyOn(component.removeSinger, 'emit');

    component.requestRemoval(7);

    expect(removeSinger).not.toHaveBeenCalled();
  });

  it('no permite modificar cuando el componente está en modo de solo lectura', () => {
    fixture.componentRef.setInput('canEdit', false);

    const toggleLock = vi.spyOn(component.toggleLock, 'emit');
    const removeSinger = vi.spyOn(component.removeSinger, 'emit');

    component.requestLockToggle(singers[0]);
    component.requestRemoval(7);

    expect(toggleLock).not.toHaveBeenCalled();
    expect(removeSinger).not.toHaveBeenCalled();
  });
});
