import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { vi } from 'vitest';

import { ChoirsApiService } from '../choirs/choirs-api.service';
import { FormationsPage } from '../pages';
import { Singer } from '../singers/singer.model';
import { SingersStore } from '../singers/singers.store';
import { FormationDraftsApiService } from './formation-drafts-api.service';
import { FormationDraft } from './formation-draft.model';

describe('FormationsPage - integración de borradores CHOIR-21', () => {
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

  const singersByChoir = signal<Record<string, Singer[]>>({ '10': singers });
  const loadingByChoir = signal<Record<string, boolean>>({ '10': false });
  const errorsByChoir = signal<Record<string, string | null>>({ '10': null });

  const listConcerts = vi.fn();
  const listConcertRepertoire = vi.fn();
  const listFormations = vi.fn();
  const createFormation = vi.fn();
  const getDraft = vi.fn();
  const saveDraftPositions = vi.fn();
  const lockPosition = vi.fn();
  const unlockPosition = vi.fn();
  const loadSingers = vi.fn();

  let fixture: ReturnType<typeof TestBed.createComponent<FormationsPage>>;
  let component: FormationsPage;

  function draft(positions: FormationDraft['positions'] = []): FormationDraft {
    return {
      formationId: 40,
      name: 'Formación de prueba',
      description: null,
      draftVersionId: 50,
      versionNumber: 3,
      status: 'DRAFT',
      notes: null,
      createdAt: null,
      positions
    };
  }

  function selection(value: string): Event {
    return { target: { value } } as unknown as Event;
  }

  beforeEach(async () => {
    singersByChoir.set({ '10': singers });
    loadingByChoir.set({ '10': false });
    errorsByChoir.set({ '10': null });

    listConcerts.mockReset().mockReturnValue(of([{
      id: 20,
      choirId: 10,
      title: 'Concierto de prueba',
      concertDate: '2026-11-15',
      venue: null,
      status: 'PLANNED'
    }]));
    listConcertRepertoire.mockReset().mockReturnValue(of([{
      concertId: 20,
      repertoireItemId: 30,
      orderIndex: 1,
      durationMinutes: 4,
      stageRequirements: null,
      title: 'Obra de prueba',
      composer: 'Compositor',
      arranger: null
    }]));
    listFormations.mockReset().mockReturnValue(of([{
      id: 40,
      name: 'Formación de prueba',
      description: null
    }]));
    createFormation.mockReset();
    getDraft.mockReset().mockReturnValue(of(draft()));
    saveDraftPositions.mockReset().mockReturnValue(of(draft()));
    lockPosition.mockReset().mockReturnValue(of(undefined));
    unlockPosition.mockReset().mockReturnValue(of(undefined));
    loadSingers.mockReset();

    await TestBed.configureTestingModule({
      imports: [FormationsPage],
      providers: [
        {
          provide: ChoirsApiService,
          useValue: {
            list: () => of([{
              id: 10,
              name: 'Coro de prueba',
              description: null,
              archived: false
            }])
          }
        },
        {
          provide: FormationDraftsApiService,
          useValue: {
            listConcerts,
            listConcertRepertoire,
            listFormations,
            createFormation,
            getDraft,
            saveDraftPositions,
            lockPosition,
            unlockPosition
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

  function selectFormationFlow(): void {
    component.selectConcert(selection('20'));
    component.selectRepertoireItem(selection('30'));
    component.selectFormation(selection('40'));
  }

  it('carga conciertos y repertorio a partir del coro y el concierto seleccionado', () => {
    expect(listConcerts).toHaveBeenCalledWith(10);

    component.selectConcert(selection('20'));

    expect(listConcertRepertoire).toHaveBeenCalledWith(10, 20);
    expect(component.selectedConcertId()).toBe(20);
    expect(component.repertoire()).toHaveLength(1);
    expect(component.repertoire()[0].title).toBe('Obra de prueba');
    expect(component.repertoireLoading()).toBe(false);
  });

  it('mantiene la formación creada y permite reintentar la carga del borrador cuando el GET falla', () => {
    const created = {
      id: 41,
      name: 'Estrofa nueva',
      description: 'Creada por director',
      draftVersionId: 51,
      versionNumber: 1,
      status: 'DRAFT'
    };

    component.selectedChoirId.set(10);
    component.selectedConcertId.set(20);
    component.selectedRepertoireItemId.set(30);
    component.formations.set([{ id: 40, name: 'Formación de prueba', description: null }]);
    fixture.detectChanges();

    component.openCreateFormationForm();
    component.updateCreateFormationName({ target: { value: 'Estrofa nueva' } } as unknown as Event);
    component.updateCreateFormationDescription({ target: { value: 'Creada por director' } } as unknown as Event);
    createFormation.mockReturnValue(of(created));
    getDraft.mockReturnValueOnce(throwError(() => new Error('GET failed')));

    component.createFormation({ preventDefault: vi.fn() } as unknown as Event);
    fixture.detectChanges();

    expect(component.formations()).toContainEqual(created);
    expect(component.selectedFormationId()).toBe(41);
    expect(component.workflowError()).toBe(
      'La formación fue creada, pero no se pudieron cargar sus posiciones. Podés reintentar la carga.'
    );
    expect(component.creatingFormation()).toBe(false);
    expect(component.selectedDraft()).toBeNull();

    getDraft.mockReturnValueOnce(of(draft([{
      id: 60,
      singerId: 7,
      singerNameSnapshot: 'Ana Prueba',
      voicePartSnapshot: 'Soprano',
      voiceSectionIdSnapshot: 1,
      voiceSectionNameSnapshot: 'Sopranos',
      divisionNumberSnapshot: null,
      positionLabel: 'Centro',
      x: 31,
      y: 42,
      locked: false
    }])));

    component.retryWorkflow();
    fixture.detectChanges();

    expect(component.selectedDraft()?.draftVersionId).toBe(50);
    expect(component.stageSingers().some(person => person.id === 7)).toBe(true);
  });

  it('carga las formaciones y aplica al escenario las posiciones del borrador', () => {
    getDraft.mockReturnValue(of(draft([{
      id: 60,
      singerId: 7,
      singerNameSnapshot: 'Ana Prueba',
      voicePartSnapshot: 'Soprano',
      voiceSectionIdSnapshot: 1,
      voiceSectionNameSnapshot: 'Sopranos',
      divisionNumberSnapshot: null,
      positionLabel: 'Centro',
      x: 31,
      y: 42,
      locked: true
    }])));

    selectFormationFlow();

    expect(listFormations).toHaveBeenCalledWith(10, 20, 30);
    expect(component.formations()).toHaveLength(1);
    expect(getDraft).toHaveBeenCalledWith(10, 20, 30, 40);
    expect(component.selectedDraft()?.draftVersionId).toBe(50);

    const ana = component.stageSingers().find(person => person.id === 7);
    expect(ana?.x).toBe(31);
    expect(ana?.y).toBe(42);
    expect(ana?.positionId).toBe(60);
    expect(ana?.locked).toBe(true);
    expect(component.draftLoading()).toBe(false);
  });

  it('guarda las posiciones locales con el identificador de versión del borrador', () => {
    selectFormationFlow();

    component.toggleSingerInFormation(7);
    component.toggleSingerInFormation(8);
    component.singerPositions.set({
      7: { x: 22, y: 33 },
      8: { x: 67, y: 71 }
    });

    component.savePositions();

    expect(saveDraftPositions).toHaveBeenCalledWith(
      10,
      20,
      30,
      40,
      50,
      {
        positions: [
          { singerId: 7, x: 22, y: 33 },
          { singerId: 8, x: 67, y: 71 }
        ]
      }
    );
    expect(component.savingDraft()).toBe(false);
    expect(component.saveSuccess()).toBe(true);
    expect(component.saveError()).toBeNull();
  });

  it('permite quitar una posición bloqueada, guardarla y volver a agregar al coreuta', () => {
    const lockedDraft = draft([{
      id: 60,
      singerId: 7,
      singerNameSnapshot: 'Ana Prueba',
      voicePartSnapshot: 'Soprano',
      voiceSectionIdSnapshot: 1,
      voiceSectionNameSnapshot: 'Sopranos',
      divisionNumberSnapshot: null,
      positionLabel: 'Centro',
      x: 31,
      y: 42,
      locked: true
    }]);
    getDraft
      .mockReturnValueOnce(of(lockedDraft))
      .mockReturnValueOnce(of(draft()));

    selectFormationFlow();
    fixture.detectChanges();

    expect(component.stageSingers().map(singer => singer.id)).toEqual([7]);
    expect(component.stageSingers()[0].locked).toBe(true);

    const element = fixture.nativeElement as HTMLElement;
    element.querySelector<HTMLButtonElement>(
      '[aria-label="Quitar Ana Prueba de la formación"]'
    )!.click();
    fixture.detectChanges();

    expect(component.stageSingers()).toEqual([]);
    expect(component.isSingerInFormation(7)).toBe(false);
    expect(component.selectedDraft()?.positions[0].locked).toBe(true);
    expect(element.querySelector<HTMLButtonElement>(
      '[aria-label="Agregar Ana Prueba a la formación"]'
    )).not.toBeNull();

    component.savePositions();

    expect(saveDraftPositions).toHaveBeenCalledWith(
      10, 20, 30, 40, 50, { positions: [] }
    );
    expect(component.saveSuccess()).toBe(true);

    component.selectFormation(selection('40'));
    fixture.detectChanges();

    expect(getDraft).toHaveBeenCalledTimes(2);
    expect(component.stageSingers()).toEqual([]);
    expect(element.querySelector<HTMLButtonElement>(
      '[aria-label="Agregar Ana Prueba a la formación"]'
    )).not.toBeNull();

    element.querySelector<HTMLButtonElement>(
      '[aria-label="Agregar Ana Prueba a la formación"]'
    )!.click();
    fixture.detectChanges();

    expect(component.stageSingers().map(singer => singer.id)).toEqual([7]);
  });

  it.each([
    { locked: false, state: 'desbloqueada' },
    { locked: true, state: 'bloqueada' }
  ])(
    'quita una posición $state desde el escenario y persiste el cambio',
    ({ locked }) => {
      const initialDraft = draft([
        {
          id: 60,
          singerId: 7,
          singerNameSnapshot: 'Ana Prueba',
          voicePartSnapshot: 'Soprano',
          voiceSectionIdSnapshot: 1,
          voiceSectionNameSnapshot: 'Sopranos',
          divisionNumberSnapshot: null,
          positionLabel: 'Centro',
          x: 31,
          y: 42,
          locked
        },
        {
          id: 61,
          singerId: 8,
          singerNameSnapshot: 'Bea Prueba',
          voicePartSnapshot: 'Contralto',
          voiceSectionIdSnapshot: 2,
          voiceSectionNameSnapshot: 'Contraltos',
          divisionNumberSnapshot: null,
          positionLabel: 'Lateral',
          x: 67,
          y: 71,
          locked: false
        }
      ]);
      const savedDraft = draft([initialDraft.positions[1]]);
      getDraft
        .mockReturnValueOnce(of(initialDraft))
        .mockReturnValueOnce(of(savedDraft));
      saveDraftPositions.mockReturnValueOnce(of(savedDraft));

      selectFormationFlow();
      fixture.detectChanges();

      const element = fixture.nativeElement as HTMLElement;
      const removeButton = element.querySelector<HTMLButtonElement>(
        '[aria-label="Quitar Ana Prueba de la formación"]'
      );
      expect(removeButton?.type).toBe('button');
      expect(component.stageSingers().map(singer => singer.id)).toEqual([7, 8]);

      removeButton!.dispatchEvent(new Event('pointerdown', { bubbles: true }));
      removeButton!.click();
      fixture.detectChanges();

      expect(component.stageSingers().map(singer => singer.id)).toEqual([8]);
      expect(component.isSingerInFormation(7)).toBe(false);
      expect(singersByChoir()['10'].some(singer => singer.id === 7)).toBe(true);
      expect(element.querySelector(
        '[aria-label="Agregar Ana Prueba a la formación"]'
      )).not.toBeNull();
      expect(unlockPosition).not.toHaveBeenCalled();
      expect(lockPosition).not.toHaveBeenCalled();

      component.savePositions();

      expect(saveDraftPositions).toHaveBeenCalledWith(
        10,
        20,
        30,
        40,
        50,
        { positions: [{ singerId: 8, x: 67, y: 71 }] }
      );

      component.selectFormation(selection('40'));
      fixture.detectChanges();

      expect(getDraft).toHaveBeenCalledTimes(2);
      expect(component.stageSingers().map(singer => singer.id)).toEqual([8]);
      expect(element.querySelector(
        '[aria-label="Agregar Ana Prueba a la formación"]'
      )).not.toBeNull();
    }
  );

  it('guarda y vuelve a cargar una formación vacía, permitiendo reincorporar integrantes', () => {
    selectFormationFlow();
    fixture.detectChanges();

    expect(component.stageSingers()).toEqual([]);
    expect((fixture.nativeElement as HTMLElement).textContent)
      .toContain('Esta formación está vacía');
    expect(Array.from(
      (fixture.nativeElement as HTMLElement)
        .querySelectorAll<HTMLButtonElement>('.singer-list-action')
    ).map(button => button.textContent?.trim())).toEqual(['Agregar', 'Agregar']);

    const element = fixture.nativeElement as HTMLElement;
    element.querySelector<HTMLButtonElement>(
      '[aria-label="Agregar Ana Prueba a la formación"]'
    )!.click();
    fixture.detectChanges();
    expect(component.stageSingers().map(singer => singer.id)).toEqual([7]);

    element.querySelector<HTMLButtonElement>(
      '[aria-label="Agregar Bea Prueba a la formación"]'
    )!.click();
    fixture.detectChanges();
    expect(component.stageSingers().map(singer => singer.id)).toEqual([7, 8]);

    element.querySelector<HTMLButtonElement>(
      '[aria-label="Quitar Ana Prueba de la formación"]'
    )!.click();
    element.querySelector<HTMLButtonElement>(
      '[aria-label="Quitar Bea Prueba de la formación"]'
    )!.click();
    fixture.detectChanges();
    expect(component.stageSingers()).toEqual([]);

    component.savePositions();

    expect(saveDraftPositions).toHaveBeenCalledWith(
      10, 20, 30, 40, 50, { positions: [] }
    );
    expect(component.saveSuccess()).toBe(true);

    component.selectFormation(selection('40'));
    fixture.detectChanges();

    expect(component.selectedDraft()?.positions).toEqual([]);
    expect(component.stageSingers()).toEqual([]);
    expect((fixture.nativeElement as HTMLElement).textContent)
      .toContain('Esta formación está vacía');
  });

  it('conserva los cambios locales ante un error de guardado y permite reintentar', () => {
    selectFormationFlow();
    component.toggleSingerInFormation(7);
    component.toggleSingerInFormation(8);

    const localPositions = {
      7: { x: 19, y: 28 },
      8: { x: 73, y: 81 }
    };
    component.singerPositions.set(localPositions);
    saveDraftPositions.mockReturnValue(
      throwError(() => new Error('Error de red'))
    );

    component.savePositions();

    expect(component.singerPositions()).toEqual(localPositions);
    expect(component.stageSingers().find(person => person.id === 7)?.x)
      .toBe(19);
    expect(component.stageSingers().find(person => person.id === 7)?.y)
      .toBe(28);
    expect(component.savingDraft()).toBe(false);
    expect(component.saveSuccess()).toBe(false);
    expect(component.saveError()).toContain('Tus cambios siguen en pantalla');

    saveDraftPositions.mockReturnValue(of(draft()));
    component.savePositions();

    expect(saveDraftPositions).toHaveBeenCalledTimes(2);
    expect(component.saveSuccess()).toBe(true);
    expect(component.saveError()).toBeNull();
  });

  it('muestra el error del repertorio y permite reintentar la carga', () => {
    listConcertRepertoire.mockReturnValue(
      throwError(() => new Error('Error de red'))
    );

    component.selectConcert(selection('20'));

    expect(component.workflowError()).toContain(
      'No se pudo cargar el repertorio'
    );
    expect(component.repertoireLoading()).toBe(false);

    listConcertRepertoire.mockReturnValue(of([{
      concertId: 20,
      repertoireItemId: 30,
      orderIndex: 1,
      durationMinutes: 4,
      stageRequirements: null,
      title: 'Obra de prueba',
      composer: 'Compositor',
      arranger: null
    }]));

    component.retryWorkflow();

    expect(listConcertRepertoire).toHaveBeenCalledTimes(2);
    expect(component.workflowError()).toBeNull();
    expect(component.repertoire()).toHaveLength(1);
    expect(component.repertoireLoading()).toBe(false);
  });

  it('muestra el error del borrador y permite reintentar su carga', () => {
    getDraft.mockReturnValue(
      throwError(() => new Error('Error de red'))
    );

    selectFormationFlow();

    expect(component.workflowError()).toContain(
      'No se pudo cargar el borrador'
    );
    expect(component.draftLoading()).toBe(false);
    expect(component.selectedDraft()).toBeNull();

    getDraft.mockReturnValue(of(draft()));
    component.retryWorkflow();

    expect(getDraft).toHaveBeenCalledTimes(2);
    expect(component.workflowError()).toBeNull();
    expect(component.selectedDraft()?.draftVersionId).toBe(50);
    expect(component.draftLoading()).toBe(false);
  });


  it('ignora el error de repertorio de un concierto que ya no está seleccionado', () => {
    const staleRequest = new Subject<any>();
    listConcertRepertoire
      .mockReturnValueOnce(staleRequest)
      .mockReturnValue(of([{
        concertId: 21,
        repertoireItemId: 31,
        orderIndex: 1,
        durationMinutes: 4,
        stageRequirements: null,
        title: 'Obra actual',
        composer: 'Compositor',
        arranger: null
      }]));

    component.selectConcert(selection('20'));
    component.selectConcert(selection('21'));
    staleRequest.error(new Error('Error de red tardío'));

    expect(component.selectedConcertId()).toBe(21);
    expect(component.repertoire()[0]?.title).toBe('Obra actual');
    expect(component.workflowError()).toBeNull();
    expect(component.repertoireLoading()).toBe(false);
  });

  it('ignora el error de formaciones de una obra que ya no está seleccionada', () => {
    const staleRequest = new Subject<any>();
    listFormations
      .mockReturnValueOnce(staleRequest)
      .mockReturnValue(of([{
        id: 41,
        name: 'Formación actual',
        description: null
      }]));

    component.selectConcert(selection('20'));
    component.selectRepertoireItem(selection('30'));
    component.selectRepertoireItem(selection('31'));
    staleRequest.error(new Error('Error de red tardío'));

    expect(component.selectedRepertoireItemId()).toBe(31);
    expect(component.formations().map(item => item.id)).toEqual([41]);
    expect(component.workflowError()).toBeNull();
    expect(component.formationsLoading()).toBe(false);
  });

  it('ignora el error de borrador de una formación anterior', () => {
    const staleRequest = new Subject<any>();
    getDraft
      .mockReturnValueOnce(staleRequest)
      .mockReturnValue(of(draft()));

    component.selectConcert(selection('20'));
    component.selectRepertoireItem(selection('30'));
    component.selectFormation(selection('40'));
    component.selectFormation(selection('41'));
    staleRequest.error(new Error('Error de red tardío'));

    expect(component.selectedFormationId()).toBe(41);
    expect(component.selectedDraft()).not.toBeNull();
    expect(component.workflowError()).toBeNull();
    expect(component.draftLoading()).toBe(false);
  });

  it('ignora el error de guardado de una formación anterior', () => {
    const staleRequest = new Subject<any>();
    saveDraftPositions.mockReturnValue(staleRequest);

    selectFormationFlow();
    component.savePositions();
    component.selectFormation(selection('41'));
    staleRequest.error(new Error('Error de red tardío'));

    expect(component.selectedFormationId()).toBe(41);
    expect(component.saveError()).toBeNull();
    expect(component.savingDraft()).toBe(false);
  });

});
