import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

import { Choir } from './choir.model';
import { ChoirsApiService } from './choirs-api.service';
import { ChoirPage } from '../pages';

describe('ChoirPage', () => {
  let component: ChoirPage;
  let fixture: ReturnType<typeof TestBed.createComponent<ChoirPage>>;
  let api: {
    list: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    archive: ReturnType<typeof vi.fn>;
  };

  const active: Choir = {
    id: 1, name: 'Coro Aurora', description: 'Coro principal', archived: false
  };
  const archived: Choir = {
    id: 2, name: 'Coro Histórico', description: null, archived: true
  };

  beforeEach(async () => {
    api = {
      list: vi.fn().mockReturnValue(of([archived, active])),
      create: vi.fn(),
      update: vi.fn(),
      archive: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ChoirPage],
      providers: [{ provide: ChoirsApiService, useValue: api }]
    }).compileComponents();

    fixture = TestBed.createComponent(ChoirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('lista los coros activos antes que los archivados', () => {
    expect(api.list).toHaveBeenCalledWith(true);
    expect(component.choirs().map(item => item.id)).toEqual([1, 2]);
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Coro Aurora');
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Archivado');
  });

  it('crea un coro normalizando los campos', () => {
    const created: Choir = {
      id: 3, name: 'Coro Nuevo', description: 'Descripción', archived: false
    };
    api.create.mockReturnValue(of(created));
    component.name.set('  Coro Nuevo ');
    component.description.set(' Descripción ');

    component.save();

    expect(api.create).toHaveBeenCalledWith({
      name: 'Coro Nuevo', description: 'Descripción'
    });
    expect(component.choirs().some(item => item.id === 3)).toBe(true);
    expect(component.name()).toBe('');
  });

  it('rechaza un nombre vacío', () => {
    component.name.set('  ');
    component.save();

    expect(api.create).not.toHaveBeenCalled();
    expect(component.formError()).toBe('El nombre del coro es obligatorio.');
  });

  it('edita un coro existente', () => {
    const updated: Choir = {
      ...active, name: 'Coro actualizado', description: 'Nueva descripción'
    };
    api.update.mockReturnValue(of(updated));
    component.beginEdit(active);
    component.name.set(updated.name);
    component.description.set(updated.description ?? '');

    component.save();

    expect(api.update).toHaveBeenCalledWith(1, {
      name: 'Coro actualizado', description: 'Nueva descripción'
    });
    expect(component.choirs().find(item => item.id === 1)?.name).toBe('Coro actualizado');
  });

  it('requiere confirmación antes de archivar', () => {
    api.archive.mockReturnValue(of(void 0));
    component.requestArchive(active.id);

    expect(api.archive).not.toHaveBeenCalled();
    component.confirmArchive(active);

    expect(api.archive).toHaveBeenCalledWith(active.id);
    expect(component.choirs().find(item => item.id === active.id)?.archived).toBe(true);
  });

  it('permite reintentar una carga fallida', () => {
    api.list.mockReturnValueOnce(throwError(() => new Error('offline')));
    component.loadChoirs();
    expect(component.error()).toContain('No pudimos cargar');

    api.list.mockReturnValueOnce(of([active]));
    component.loadChoirs();

    expect(component.error()).toBeNull();
    expect(component.choirs()).toEqual([active]);
  });
});
