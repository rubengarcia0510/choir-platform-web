import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { ChoirSingersComponent } from './choir-singers.component';
import { Singer } from './singer.model';
import { SingersApiService } from './singers-api.service';
import { SingersStore } from './singers.store';
import { VocalSection } from './vocal-section.model';
import { VocalSectionsApiService } from './vocal-sections-api.service';

describe('ChoirSingersComponent', () => {
  let fixture: ComponentFixture<ChoirSingersComponent>;
  let component: ChoirSingersComponent;
  let singersApi: {
    list: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    deactivate: ReturnType<typeof vi.fn>;
    reactivate: ReturnType<typeof vi.fn>;
  };
  let sectionsApi: { list: ReturnType<typeof vi.fn> };
  let singersStore: { loadSingers: ReturnType<typeof vi.fn> };

  const singer: Singer = {
    id: 12,
    choirId: 7,
    displayName: 'Ana Prueba',
    email: 'ana@example.test',
    voicePart: 'Soprano',
    voiceSectionId: 3,
    mobility: null,
    restrictions: null,
    active: true
  };

  const section: VocalSection = {
    id: 3,
    choirId: 7,
    name: 'Sopranos',
    sortOrder: 1,
    active: true,
    createdAt: null
  };

  beforeEach(async () => {
    singersApi = {
      list: vi.fn().mockReturnValue(of([singer])),
      create: vi.fn().mockReturnValue(of(singer)),
      update: vi.fn().mockReturnValue(of(singer)),
      deactivate: vi.fn().mockReturnValue(of(void 0)),
      reactivate: vi.fn().mockReturnValue(of({ ...singer, active: true }))
    };

    sectionsApi = {
      list: vi.fn().mockReturnValue(of([section]))
    };

    singersStore = {
      loadSingers: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ChoirSingersComponent],
      providers: [
        { provide: SingersApiService, useValue: singersApi },
        { provide: VocalSectionsApiService, useValue: sectionsApi },
        { provide: SingersStore, useValue: singersStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChoirSingersComponent);
    component = fixture.componentInstance;
    component.choirId = 7;
    component.choirName = 'Coro de prueba';
    fixture.detectChanges();
  });

  it('carga integrantes activos e inactivos y secciones del coro', () => {
    expect(singersApi.list).toHaveBeenCalledWith(7, true);
    expect(sectionsApi.list).toHaveBeenCalledWith(7);
    expect(component.singers()).toEqual([singer]);
    expect(component.sections()).toEqual([section]);
    expect(component.sectionName(3)).toBe('Sopranos');
  });

  it('ordena integrantes activos antes que inactivos', () => {
    const inactive = { ...singer, id: 13, displayName: 'Beatriz', active: false };
    const active = { ...singer, id: 14, displayName: 'Carlos' };
    singersApi.list.mockReturnValue(of([inactive, active]));
    component.load();

    expect(component.singers().map(item => item.id)).toEqual([14, 13]);
  });

  it('abre el formulario de alta vacío', () => {
    component.beginCreate();

    expect(component.formOpen()).toBe(true);
    expect(component.editingId()).toBeNull();
    expect(component.form().displayName).toBe('');
  });

  it('crea un integrante y sincroniza la lista de Formaciones', () => {
    component.beginCreate();
    component.form.set({
      displayName: '  Nueva cantante  ',
      email: ' nueva@example.test ',
      voicePart: 'Soprano',
      voiceSectionId: '3',
      mobility: '',
      restrictions: ''
    });

    component.save(new Event('submit'));

    expect(singersApi.create).toHaveBeenCalledWith(7, {
      displayName: 'Nueva cantante',
      email: 'nueva@example.test',
      voicePart: 'Soprano',
      voiceSectionId: 3,
      mobility: null,
      restrictions: null
    });
    expect(singersStore.loadSingers).toHaveBeenCalledWith(7, true);
    expect(component.formOpen()).toBe(false);
    expect(component.success()).toContain('agregado');
  });

  it('edita un integrante y sincroniza la lista de Formaciones', () => {
    component.beginEdit(singer);
    component.form.update(current => ({
      ...current,
      displayName: 'Ana Editada'
    }));

    component.save(new Event('submit'));

    expect(singersApi.update).toHaveBeenCalledWith(
      7,
      12,
      expect.objectContaining({ displayName: 'Ana Editada' })
    );
    expect(singersStore.loadSingers).toHaveBeenCalledWith(7, true);
    expect(component.success()).toContain('actualizado');
  });

  it('rechaza un nombre vacío sin llamar a la API', () => {
    component.beginCreate();
    component.form.set({
      displayName: '   ',
      email: '',
      voicePart: '',
      voiceSectionId: '',
      mobility: '',
      restrictions: ''
    });

    component.save(new Event('submit'));

    expect(singersApi.create).not.toHaveBeenCalled();
    expect(component.formError()).toContain('obligatorio');
  });

  it('da de baja lógicamente y sincroniza la lista de Formaciones', () => {
    component.deactivationId.set(12);

    component.deactivate(singer);

    expect(singersApi.deactivate).toHaveBeenCalledWith(7, 12);
    expect(singersStore.loadSingers).toHaveBeenCalledWith(7, true);
    expect(component.success()).toContain('baja');
  });

  it('reactiva un integrante y sincroniza la lista de Formaciones', () => {
    component.reactivate({ ...singer, active: false });

    expect(singersApi.reactivate).toHaveBeenCalledWith(7, 12);
    expect(singersStore.loadSingers).toHaveBeenCalledWith(7, true);
    expect(component.success()).toContain('reactivado');
  });

  it('no permite editar un integrante inactivo', () => {
    component.beginEdit({ ...singer, active: false });

    expect(component.formOpen()).toBe(false);
    expect(component.editingId()).toBeNull();
  });

  it('muestra un error si falla la carga de integrantes', () => {
    singersApi.list.mockReturnValue(throwError(() => new Error('network')));
    component.load();

    expect(component.error()).toContain('No pudimos cargar');
    expect(component.loading()).toBe(false);
  });

  it('muestra un error si falla el alta', () => {
    singersApi.create.mockReturnValue(throwError(() => new Error('network')));
    component.beginCreate();
    component.form.update(current => ({
      ...current,
      displayName: 'Nueva cantante'
    }));

    component.save(new Event('submit'));

    expect(component.formError()).toContain('No pudimos guardar');
    expect(singersStore.loadSingers).not.toHaveBeenCalled();
  });
});
