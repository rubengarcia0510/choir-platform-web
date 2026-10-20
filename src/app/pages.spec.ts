import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { ChoirsApiService } from './choirs/choirs-api.service';
import { FormationsPage } from './pages';
import { Singer } from './singers/singer.model';
import { SingersStore } from './singers/singers.store';

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

  const loadSingers = vi.fn();

  beforeEach(async () => {
    singersByChoir.set({ '10': singers });
    loadingByChoir.set({ '10': false });
    errorsByChoir.set({ '10': null });
    loadSingers.mockClear();

    await TestBed.configureTestingModule({
      imports: [FormationsPage],
      providers: [
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
