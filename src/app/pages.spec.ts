import { signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { TestBed } from '@angular/core/testing';
import { Observable, of, Subject, throwError } from 'rxjs';
import { vi } from 'vitest';

import { ChoirsApiService } from './choirs/choirs-api.service';
import { FormationsPage } from './pages';
import { Singer } from './singers/singer.model';
import { SingersStore } from './singers/singers.store';
import { FormationDraftsApiService } from './formations/formation-drafts-api.service';

describe('FormationsPage - editor de escenario CHOIR-21', () => {
  let fixture: ReturnType<typeof TestBed.createComponent<FormationsPage>>;
  let component: FormationsPage;

  const singers: Singer[] = [
    {
      id: 7,
      choirId: 10,
      displayName: 'Ana Prueba',
      email: null,
      voicePart: 'Soprano',
      voiceSectionId: 1,
      mobility: null,
      restrictions: null,
      active: true
    },
    {
      id: 8,
      choirId: 10,
      displayName: 'Bea Prueba',
      email: null,
      voicePart: 'Contralto',
      voiceSectionId: 2,
      mobility: null,
      restrictions: null,
      active: true
    }
  ];

  const singersByChoir = signal<Record<string, Singer[]>>({
    '10': singers
  });

  const loadingByChoir = signal<Record<string, boolean>>({
    '10': false
  });

  const errorsByChoir = signal<Record<string, string | null>>({
    '10': null
  });

  const currentDirector = signal({
    id: 25,
    displayName: 'Rosa Directora',
    email: 'rosa@example.test'
  });

  const loadSingers = vi.fn();
  const lockPosition = vi.fn((): Observable<void> => of(undefined));
  const unlockPosition = vi.fn((): Observable<void> => of(undefined));
  const getDraft = vi.fn();
  const saveDraftPositions = vi.fn();

  function draft(
    formationId: number,
    draftVersionId: number,
    locked: boolean,
    withPositions = true
  ) {
    return {
      formationId,
      name: 'Formación de prueba',
      description: null,
      draftVersionId,
      versionNumber: 1,
      status: 'DRAFT' as const,
      notes: null,
      createdAt: null,
      positions: withPositions ? [
        {
          id: 60,
          singerId: 7,
          singerNameSnapshot: 'Ana Prueba',
          voicePartSnapshot: 'Soprano',
          voiceSectionIdSnapshot: 1,
          voiceSectionNameSnapshot: 'Soprano',
          divisionNumberSnapshot: null,
          positionLabel: null,
          x: 30,
          y: 40,
          locked
        },
        {
          id: 61,
          singerId: 8,
          singerNameSnapshot: 'Bea Prueba',
          voicePartSnapshot: 'Contralto',
          voiceSectionIdSnapshot: 2,
          voiceSectionNameSnapshot: 'Contralto',
          divisionNumberSnapshot: null,
          positionLabel: null,
          x: 70,
          y: 40,
          locked: false
        }
      ] : []
    };
  }

  beforeEach(async () => {
    singersByChoir.set({ '10': singers });
    loadingByChoir.set({ '10': false });
    errorsByChoir.set({ '10': null });
    currentDirector.set({
      id: 25,
      displayName: 'Rosa Directora',
      email: 'rosa@example.test'
    });
    loadSingers.mockClear();
    lockPosition.mockReset();
    lockPosition.mockReturnValue(of(undefined));
    unlockPosition.mockReset();
    unlockPosition.mockReturnValue(of(undefined));
    getDraft.mockReset().mockReturnValue(of(draft(40, 50, false, false)));
    saveDraftPositions.mockReset()
      .mockReturnValue(of(draft(40, 50, false, false)));

    await TestBed.configureTestingModule({
      imports: [FormationsPage],
      providers: [
        {
          provide: AuthService,
          useValue: { currentDirector }
        },
        {
          provide: FormationDraftsApiService,
          useValue: {
            listConcerts: () => of([]),
            listConcertRepertoire: () => of([]),
            listFormations: () => of([]),
            getDraft,
            saveDraftPositions,
            lockPosition,
            unlockPosition
          }
        },
        {
          provide: ChoirsApiService,
          useValue: {
            list: () => of([
              {
                id: 10,
                name: 'Coro de prueba',
                description: null,
                archived: false
              }
            ])
          }
        },
        {
          provide: SingersStore,
          useValue: {
            singersByChoir,
            loadingByChoir,
            errorsByChoir,
            loadSingers
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormationsPage);
    component = fixture.componentInstance;
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
      preventDefault: vi.fn()
    } as unknown as PointerEvent;
  }

  function stageAndSinger(): {
    stage: HTMLElement;
    person: HTMLElement;
  } {
    const stage = fixture.nativeElement.querySelector(
      '.stage'
    ) as HTMLElement;

    const person = fixture.nativeElement.querySelector(
      '.stage-person'
    ) as HTMLElement;

    if (!stage || !person) {
      throw new Error('No se encontró el escenario o el integrante.');
    }

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

    person.setPointerCapture = vi.fn();

    return { stage, person };
  }

  function setSelectedDraft(locked = false): void {
    component.selectedChoirId.set(10);
    component.selectedConcertId.set(20);
    component.selectedRepertoireItemId.set(30);
    component.selectedFormationId.set(40);
    component.selectedDraft.set(draft(40, 50, locked));
    fixture.detectChanges();
  }

  function selectFormation(formationId: number, locked: boolean): void {
    const draftVersionId = formationId + 10;
    getDraft.mockReturnValue(of(draft(formationId, draftVersionId, locked)));
    component.selectFormation({
      target: { value: String(formationId) }
    } as unknown as Event);
    fixture.detectChanges();
  }

  it('representa al director sin contarlo como integrante ni permitir arrastrarlo', () => {
    const element = fixture.nativeElement as HTMLElement;
    const director = element.querySelector<HTMLElement>('.stage-director');

    expect(director).toBeTruthy();
    expect(director?.getAttribute('role')).toBe('img');
    expect(director?.getAttribute('aria-label'))
      .toBe('Director del coro: Rosa Directora');
    expect(director?.textContent).toContain('Dirección');
    expect(director?.textContent).toContain('Rosa Directora');
    expect(director?.querySelector('.stage-director-avatar')?.textContent?.trim())
      .toBe('R');
    expect(director?.classList.contains('stage-person')).toBe(false);
    expect(element.querySelectorAll('.stage-person')).toHaveLength(2);
    expect(getComputedStyle(director!).pointerEvents).toBe('none');
  });

  it('muestra integrantes reales y sus secciones vocales', () => {
    const element = fixture.nativeElement as HTMLElement;
    const people = Array.from(
      element.querySelectorAll<HTMLElement>('.stage-person')
    );

    expect(people).toHaveLength(2);
    expect(people[0].textContent).toContain('Ana Prueba');
    expect(people[0].textContent).toContain('Soprano');
    expect(people[1].textContent).toContain('Bea Prueba');
    expect(people[1].textContent).toContain('Contralto');
    expect(loadSingers).toHaveBeenCalledWith(10);
  });

  it('muestra skeletons mientras carga el elenco, sin simular integrantes', () => {
    loadingByChoir.set({ '10': true });
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.stage')).toBeTruthy();
    expect(element.querySelector('.stage-skeleton')).toBeTruthy();
    expect(element.querySelector('.stage-person')).toBeNull();
    expect(element.querySelector('.stage-empty')).toBeNull();
    expect(element.querySelector('.stage')?.getAttribute('aria-busy'))
      .toBe('true');
  });

  it('muestra el error en el escenario y permite reintentar', () => {
    loadingByChoir.set({ '10': false });
    errorsByChoir.set({ '10': 'No se pudo cargar el elenco.' });
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.stage-error[role="alert"]')).toBeTruthy();
    expect(element.querySelector('.stage-skeleton')).toBeNull();
    expect(element.querySelector('.stage-person')).toBeNull();
    expect(element.querySelector('.stage-empty')).toBeNull();

    loadSingers.mockClear();

    const retry = element.querySelector<HTMLButtonElement>(
      '.stage-error button'
    );
    expect(retry).toBeTruthy();
    retry!.click();

    expect(loadSingers).toHaveBeenCalledWith(10, true);
  });

  it('muestra el estado vacío cuando la carga termina sin integrantes', () => {
    singersByChoir.set({ '10': [] });
    loadingByChoir.set({ '10': false });
    errorsByChoir.set({ '10': null });
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.stage-empty')).toBeTruthy();
    expect(element.querySelector('.stage-skeleton')).toBeNull();
    expect(element.querySelector('.stage-person')).toBeNull();
  });

  it('agrupa la distribución inicial por sección y distingue sus colores', () => {
    singersByChoir.set({
      '10': [
        singers[0],
        {
          ...singers[0],
          id: 9,
          displayName: 'Carla Prueba'
        },
        singers[1]
      ]
    });
    fixture.detectChanges();

    const people = component.stageSingers();
    const ana = people.find(person => person.id === 7)!;
    const carla = people.find(person => person.id === 9)!;
    const bea = people.find(person => person.id === 8)!;

    expect(ana.sectionHue).toBe(carla.sectionHue);
    expect(ana.sectionHue).not.toBe(bea.sectionHue);

    // Soprano ocupa el primer grupo y Contralto el siguiente.
    expect(ana.x).toBeLessThan(bea.x);
    expect(carla.x).toBeLessThan(bea.x);

    const anaElement = (fixture.nativeElement as HTMLElement)
      .querySelector<HTMLElement>('.stage-person');

    expect(anaElement?.style.getPropertyValue('--section-hue'))
      .toBe(String(ana.sectionHue));
  });

  it('representa las posiciones bloqueadas y ofrece acciones accesibles', () => {
    setSelectedDraft(true);

    const element = fixture.nativeElement as HTMLElement;
    const people = Array.from(
      element.querySelectorAll<HTMLButtonElement>('.stage-person')
    );
    const lockActions = Array.from(
      element.querySelectorAll<HTMLButtonElement>('.stage-person-lock-action')
    );

    expect(people[0].textContent).toContain('Bloqueada');
    expect(people[0].getAttribute('aria-label'))
      .toContain('Posición bloqueada');
    expect(people[1].textContent).not.toContain('Bloqueada');
    expect(lockActions[0].getAttribute('aria-label'))
      .toBe('Desbloquear posición de Ana Prueba');
    expect(lockActions[1].getAttribute('aria-label'))
      .toBe('Bloquear posición de Bea Prueba');
    expect(lockActions[0].disabled).toBe(false);
    expect(lockActions[1].disabled).toBe(false);
  });

  it('actualiza el bloqueo y desbloqueo solo después de la respuesta exitosa', () => {
    setSelectedDraft();
    const lockResponse = new Subject<void>();
    lockPosition.mockReturnValue(lockResponse);

    const element = fixture.nativeElement as HTMLElement;
    element.querySelector<HTMLButtonElement>(
      '[aria-label="Bloquear posición de Ana Prueba"]'
    )!.click();

    expect(lockPosition).toHaveBeenCalledWith(10, 20, 30, 40, 50, 60);
    expect(component.stageSingers()[0].locked).toBe(false);
    expect(component.isLockMutationPending(60)).toBe(true);

    lockResponse.next();
    lockResponse.complete();
    fixture.detectChanges();

    expect(component.stageSingers()[0].locked).toBe(true);
    expect(component.isLockMutationPending(60)).toBe(false);

    const unlockResponse = new Subject<void>();
    unlockPosition.mockReturnValue(unlockResponse);
    fixture.detectChanges();
    element.querySelector<HTMLButtonElement>(
      '[aria-label="Desbloquear posición de Ana Prueba"]'
    )!.click();

    expect(unlockPosition).toHaveBeenCalledWith(10, 20, 30, 40, 50, 60);
    expect(component.stageSingers()[0].locked).toBe(true);

    unlockResponse.next();
    unlockResponse.complete();
    fixture.detectChanges();

    expect(component.stageSingers()[0].locked).toBe(false);
  });

  it('preserva el estado confirmado y muestra errores 403 y 409', () => {
    setSelectedDraft();
    lockPosition.mockReturnValue(throwError(
      () => new HttpErrorResponse({ status: 403, statusText: 'Forbidden' })
    ));

    component.togglePositionLock(component.stageSingers()[0]);
    fixture.detectChanges();

    expect(component.stageSingers()[0].locked).toBe(false);
    expect(component.isLockMutationPending(60)).toBe(false);
    expect((fixture.nativeElement as HTMLElement).textContent)
      .toContain('No estás autorizado para cambiar el bloqueo');

    setSelectedDraft(true);
    unlockPosition.mockReturnValue(throwError(
      () => new HttpErrorResponse({ status: 409, statusText: 'Conflict' })
    ));

    component.togglePositionLock(component.stageSingers()[0]);
    fixture.detectChanges();

    expect(component.stageSingers()[0].locked).toBe(true);
    expect(component.isLockMutationPending(60)).toBe(false);
    expect((fixture.nativeElement as HTMLElement).textContent)
      .toContain('La versión ya no permite cambiar el bloqueo');
  });

  it('finaliza un bloqueo tardío sin limpiar otra operación del mismo positionId', () => {
    setSelectedDraft();
    const oldResponse = new Subject<void>();
    lockPosition.mockReturnValueOnce(oldResponse);
    component.togglePositionLock(component.stageSingers()[0]);

    selectFormation(41, false);
    const currentResponse = new Subject<void>();
    lockPosition.mockReturnValue(currentResponse);
    component.togglePositionLock(component.stageSingers()[0]);

    expect(component.isLockMutationPending(60)).toBe(true);

    oldResponse.next();
    oldResponse.complete();
    fixture.detectChanges();

    expect(component.selectedDraft()?.draftVersionId).toBe(51);
    expect(component.stageSingers()[0].locked).toBe(false);
    expect(component.positionLockError()).toBeNull();
    expect(component.isLockMutationPending(60)).toBe(true);

    component.savePositions();
    expect(saveDraftPositions).not.toHaveBeenCalled();

    currentResponse.next();
    currentResponse.complete();
    fixture.detectChanges();

    expect(component.stageSingers()[0].locked).toBe(true);
    expect(component.isLockMutationPending(60)).toBe(false);

    saveDraftPositions.mockReturnValue(of(draft(41, 51, true)));
    component.savePositions();

    expect(saveDraftPositions).toHaveBeenCalledWith(
      10,
      20,
      30,
      41,
      51,
      { positions: [
        { singerId: 7, x: 30, y: 40 },
        { singerId: 8, x: 70, y: 40 }
      ] }
    );
  });

  it('finaliza un bloqueo fallido tardío sin contaminar la formación nueva', () => {
    setSelectedDraft();
    const response = new Subject<void>();
    lockPosition.mockReturnValue(response);
    component.togglePositionLock(component.stageSingers()[0]);

    selectFormation(41, false);
    response.error(new HttpErrorResponse({
      status: 409,
      statusText: 'Conflict'
    }));
    fixture.detectChanges();

    expect(component.selectedDraft()?.draftVersionId).toBe(51);
    expect(component.stageSingers()[0].locked).toBe(false);
    expect(component.positionLockError()).toBeNull();
    expect(component.isLockMutationPending(60)).toBe(false);

    component.savePositions();

    expect(saveDraftPositions).toHaveBeenCalledWith(
      10,
      20,
      30,
      41,
      51,
      { positions: [
        { singerId: 7, x: 30, y: 40 },
        { singerId: 8, x: 70, y: 40 }
      ] }
    );
  });

  it('ignora el desbloqueo exitoso tardío para la formación nueva', () => {
    setSelectedDraft(true);
    const response = new Subject<void>();
    unlockPosition.mockReturnValue(response);
    component.togglePositionLock(component.stageSingers()[0]);

    selectFormation(41, true);
    response.next();
    response.complete();
    fixture.detectChanges();

    expect(component.selectedDraft()?.draftVersionId).toBe(51);
    expect(component.stageSingers()[0].locked).toBe(true);
    expect(component.positionLockError()).toBeNull();
    expect(component.isLockMutationPending(60)).toBe(false);
  });

  it('ignora el error de desbloqueo tardío para la formación nueva', () => {
    setSelectedDraft(true);
    const response = new Subject<void>();
    unlockPosition.mockReturnValue(response);
    component.togglePositionLock(component.stageSingers()[0]);

    selectFormation(41, true);
    response.error(new HttpErrorResponse({
      status: 403,
      statusText: 'Forbidden'
    }));
    fixture.detectChanges();

    expect(component.selectedDraft()?.draftVersionId).toBe(51);
    expect(component.stageSingers()[0].locked).toBe(true);
    expect(component.positionLockError()).toBeNull();
    expect(component.isLockMutationPending(60)).toBe(false);
  });

  it('no inicia un arrastre sobre una posición bloqueada', () => {
    setSelectedDraft(true);
    const { person } = stageAndSinger();
    const event = pointerEvent(person, 51, 100, 100);

    component.startDrag(event, singers[0].id);

    expect(component.dragSession()).toBeNull();
    expect(event.preventDefault).not.toHaveBeenCalled();
    expect(person.setPointerCapture).not.toHaveBeenCalled();
  });

  it('actualiza la posición del integrante durante el arrastre', () => {
    const { stage, person } = stageAndSinger();

    component.startDrag(
      pointerEvent(person, 11, 100, 100),
      singers[0].id
    );

    expect(component.dragSession()?.singerId).toBe(singers[0].id);
    expect(person.setPointerCapture).toHaveBeenCalledWith(11);

    component.moveSinger(
      pointerEvent(person, 11, 150, 130)
    );

    const moved = component.stageSingers().find(
      singer => singer.id === singers[0].id
    );

    expect(moved).toBeDefined();
    expect(moved!.x).toBeCloseTo(
      component.dragSession()!.originX + 50 / 500 * 100
    );
    expect(moved!.y).toBeCloseTo(
      component.dragSession()!.originY + 30 / 300 * 100
    );

    fixture.detectChanges();

    expect(
      (fixture.nativeElement as HTMLElement)
        .querySelector('.stage-person-dragging')
    ).toBeTruthy();

    component.endDrag(pointerEvent(person, 11, 150, 130));

    expect(component.dragSession()).toBeNull();
    expect(stage).toBeTruthy();
  });

  it('ignora movimientos de otro puntero', () => {
    const { person } = stageAndSinger();

    component.startDrag(
      pointerEvent(person, 21, 100, 100),
      singers[0].id
    );

    const before = component.stageSingers().find(
      singer => singer.id === singers[0].id
    );

    component.moveSinger(
      pointerEvent(person, 99, 400, 250)
    );

    const after = component.stageSingers().find(
      singer => singer.id === singers[0].id
    );

    expect(after?.x).toBe(before?.x);
    expect(after?.y).toBe(before?.y);
    expect(component.dragSession()?.pointerId).toBe(21);
  });

  it('mantiene los integrantes dentro de los límites del escenario', () => {
    const { person } = stageAndSinger();

    component.startDrag(
      pointerEvent(person, 31, 100, 100),
      singers[0].id
    );

    component.moveSinger(
      pointerEvent(person, 31, 10000, 10000)
    );

    const moved = component.stageSingers().find(
      singer => singer.id === singers[0].id
    );

    expect(moved?.x).toBe(95);
    expect(moved?.y).toBe(92);

    component.moveSinger(
      pointerEvent(person, 31, -10000, -10000)
    );

    const movedBack = component.stageSingers().find(
      singer => singer.id === singers[0].id
    );

    expect(movedBack?.x).toBe(5);
    expect(movedBack?.y).toBe(8);
  });

  it('ignora el final del arrastre de otro puntero', () => {
    const { person } = stageAndSinger();

    component.startDrag(
      pointerEvent(person, 41, 100, 100),
      singers[0].id
    );

    component.endDrag(
      pointerEvent(person, 42, 100, 100)
    );

    expect(component.dragSession()?.pointerId).toBe(41);

    component.endDrag(
      pointerEvent(person, 41, 100, 100)
    );

    expect(component.dragSession()).toBeNull();
  });
});
