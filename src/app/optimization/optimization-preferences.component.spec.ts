import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { vi } from 'vitest';

import { OptimizationPreferencesApiService } from './optimization-preferences-api.service';
import {
  DEFAULT_OPTIMIZATION_PREFERENCES,
  OptimizationPreferences
} from './optimization-preferences.model';
import { OptimizationPreferencesComponent } from './optimization-preferences.component';

describe('OptimizationPreferencesComponent', () => {
  let fixture: ComponentFixture<OptimizationPreferencesComponent>;
  let component: OptimizationPreferencesComponent;

  const get = vi.fn();
  const update = vi.fn();

  const preferences: OptimizationPreferences = {
    distance: 25,
    crossings: 25,
    compactness: 25,
    sectionContinuity: 25
  };

  async function createComponent(): Promise<void> {
    await TestBed.configureTestingModule({
      imports: [OptimizationPreferencesComponent],
      providers: [{
        provide: OptimizationPreferencesApiService,
        useValue: { get, update }
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(OptimizationPreferencesComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('choirId', 10);
    fixture.componentRef.setInput('concertId', 20);
    fixture.detectChanges();
  }

  function changeWeight(index: number, value: number): void {
    const inputs = fixture.nativeElement.querySelectorAll(
      '.preferences-fields input'
    ) as NodeListOf<HTMLInputElement>;

    inputs[index].value = String(value);
    inputs[index].dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  beforeEach(() => {
    get.mockReset().mockReturnValue(of({ ...preferences }));
    update.mockReset().mockReturnValue(of({ ...preferences }));
  });

  it('carga las preferencias del concierto seleccionado', async () => {
    await createComponent();

    expect(get).toHaveBeenCalledWith(10, 20);
    expect(component.draft()).toEqual(preferences);
    expect(component.confirmed()).toEqual(preferences);
    expect(component.loading()).toBe(false);
    expect(fixture.nativeElement.textContent)
      .toContain('Preferencias de optimización');
  });

  it('mantiene deshabilitado el guardado cuando los pesos no suman 100', async () => {
    await createComponent();

    changeWeight(0, 40);

    const button = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;

    expect(component.total()).toBe(115);
    expect(component.valid()).toBe(false);
    expect(button.disabled).toBe(true);
  });

  it('rechaza valores fuera del rango permitido', async () => {
    await createComponent();

    changeWeight(0, 101);
    changeWeight(1, -1);

    expect(component.valid()).toBe(false);
    expect(component.hasChanges()).toBe(true);
  });

  it('guarda los pesos cuando son válidos y suman exactamente 100', async () => {
    await createComponent();

    changeWeight(0, 40);
    changeWeight(1, 20);
    changeWeight(2, 20);
    changeWeight(3, 20);

    expect(component.valid()).toBe(true);
    expect(component.total()).toBe(100);

    const expected: OptimizationPreferences = {
      distance: 40,
      crossings: 20,
      compactness: 20,
      sectionContinuity: 20
    };

    update.mockReturnValueOnce(of(expected));

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit', {
      bubbles: true,
      cancelable: true
    }));
    fixture.detectChanges();

    expect(update).toHaveBeenCalledWith(10, 20, expected);
    expect(component.confirmed()).toEqual(expected);
    expect(component.saving()).toBe(false);
    expect(component.saveSuccess()).toBe(true);
  });

  it('muestra un error cuando falla la carga', async () => {
    get.mockReturnValueOnce(
      new Subject<OptimizationPreferences>()
    );

    await createComponent();

    const request = get.mock.results[0].value as Subject<OptimizationPreferences>;
    request.error(new Error('Network error'));
    fixture.detectChanges();

    expect(component.loading()).toBe(false);
    expect(component.loadError()).toContain(
      'No pudimos cargar las preferencias'
    );
    expect(fixture.nativeElement.textContent)
      .toContain('No pudimos cargar las preferencias');
  });

  it('ignora una respuesta de carga tardía de otro concierto', async () => {
    const firstRequest = new Subject<OptimizationPreferences>();
    const secondRequest = new Subject<OptimizationPreferences>();

    get
      .mockReturnValueOnce(firstRequest)
      .mockReturnValueOnce(secondRequest);

    await createComponent();

    fixture.componentRef.setInput('concertId', 21);
    fixture.detectChanges();

    const currentPreferences: OptimizationPreferences = {
      distance: 10,
      crossings: 30,
      compactness: 40,
      sectionContinuity: 20
    };

    secondRequest.next(currentPreferences);
    firstRequest.next({ ...DEFAULT_OPTIMIZATION_PREFERENCES });
    fixture.detectChanges();

    expect(get).toHaveBeenNthCalledWith(1, 10, 20);
    expect(get).toHaveBeenNthCalledWith(2, 10, 21);
    expect(component.draft()).toEqual(currentPreferences);
    expect(component.confirmed()).toEqual(currentPreferences);
  });

  it('ignora el resultado de un guardado iniciado para otro concierto', async () => {
    await createComponent();

    changeWeight(0, 40);
    changeWeight(1, 20);
    changeWeight(2, 20);
    changeWeight(3, 20);

    const pendingSave = new Subject<OptimizationPreferences>();
    update.mockReturnValueOnce(pendingSave);

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit', {
      bubbles: true,
      cancelable: true
    }));

    fixture.componentRef.setInput('concertId', 21);
    fixture.detectChanges();

    const currentPreferences: OptimizationPreferences = {
      distance: 10,
      crossings: 30,
      compactness: 40,
      sectionContinuity: 20
    };

    get.mockReturnValueOnce(of(currentPreferences));
    fixture.componentRef.setInput('concertId', 22);
    fixture.detectChanges();

    pendingSave.next({
      distance: 40,
      crossings: 20,
      compactness: 20,
      sectionContinuity: 20
    });
    fixture.detectChanges();

    expect(component.draft()).toEqual(currentPreferences);
    expect(component.confirmed()).toEqual(currentPreferences);
    expect(component.saveSuccess()).toBe(false);
  });
});
