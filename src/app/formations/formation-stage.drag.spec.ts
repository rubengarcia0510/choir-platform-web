import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { FormationStageComponent } from './formation-stage.component';
import { FormationStageSinger } from './formation-stage.model';

describe('FormationStageComponent drag rendering', () => {
  it('actualiza la posición visual durante el arrastre, antes de soltar', async () => {
    const singers: FormationStageSinger[] = [{
      id: 7,
      displayName: 'Ana Prueba',
      positionId: 60,
      locked: false,
      x: 30,
      y: 40,
      sectionLabel: 'Soprano',
      sectionHue: 250
    }];

    await TestBed.configureTestingModule({
      imports: [FormationStageComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(FormationStageComponent);
    const component = fixture.componentInstance;

    fixture.componentRef.setInput('singers', singers);
    fixture.componentRef.setInput('hasDraft', true);
    fixture.componentRef.setInput('canEdit', true);
    fixture.detectChanges();

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

    const button = fixture.nativeElement.querySelector(
      '.stage-person'
    ) as HTMLButtonElement;

    const pointerEvent = (
      clientX: number,
      clientY: number
    ): PointerEvent => ({
      currentTarget: button,
      pointerId: 11,
      clientX,
      clientY,
      button: 0,
      preventDefault: vi.fn()
    } as unknown as PointerEvent);

    component.startDrag(pointerEvent(100, 100), singers[0]);
    component.moveSinger(pointerEvent(150, 130));

    fixture.detectChanges();

    const wrapper = fixture.nativeElement.querySelector(
      '.stage-person-wrapper'
    ) as HTMLElement;

    expect(wrapper.style.left).toBe('40%');
    expect(wrapper.style.top).toBe('50%');
    expect(component.isDragging(7)).toBe(true);
  });
});
