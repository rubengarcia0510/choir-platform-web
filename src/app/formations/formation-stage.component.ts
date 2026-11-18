import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  signal,
} from '@angular/core';

import { FormationStageSinger } from './formation-stage.model';

interface DragSession {
  singerId: number;
  pointerId: number;
  startX: number;
  startY: number;
  initialX: number;
  initialY: number;
  currentX: number;
  currentY: number;
}

interface KeyboardMoveSession {
  singerId: number;
  initialX: number;
  initialY: number;
  currentX: number;
  currentY: number;
}

@Component({
  selector: 'app-formation-stage',
  standalone: true,
  templateUrl: './formation-stage.component.html',
  styleUrl: './formation-stage.component.scss',
})
export class FormationStageComponent {
  @Input({ required: true }) singers: FormationStageSinger[] = [];
  @Input() directorName: string | null = null;
  @Input() loading = false;
  @Input() singersLoading = false;
  @Input() error: string | null = null;
  @Input() draftLoading = false;
  @Input() hasDraft = false;
  @Input() canEdit = false;
  @Input() saving = false;
  @Input() pendingPositionIds: number[] = [];

  @Output() readonly positionChanged = new EventEmitter<{
    singerId: number;
    x: number;
    y: number;
  }>();

  @Output() readonly removeSinger = new EventEmitter<number>();
  @Output() readonly toggleLock = new EventEmitter<FormationStageSinger>();
  @Output() readonly retry = new EventEmitter<void>();

  @ViewChild('stage')
  private stageElement?: ElementRef<HTMLElement>;

  readonly dragSession = signal<DragSession | null>(null);
  readonly keyboardMoveSession = signal<KeyboardMoveSession | null>(null);

  keyboardAnnouncement = '';

  isDragging(singerId: number): boolean {
    return this.dragSession()?.singerId === singerId;
  }

  isKeyboardMoving(singerId: number): boolean {
    return this.keyboardMoveSession()?.singerId === singerId;
  }

  displayX(singer: FormationStageSinger): number {
    const drag = this.dragSession();
    const keyboard = this.keyboardMoveSession();

    if (drag?.singerId === singer.id) {
      return drag.currentX;
    }

    return keyboard?.singerId === singer.id ? keyboard.currentX : singer.x;
  }

  displayY(singer: FormationStageSinger): number {
    const drag = this.dragSession();
    const keyboard = this.keyboardMoveSession();

    if (drag?.singerId === singer.id) {
      return drag.currentY;
    }

    return keyboard?.singerId === singer.id ? keyboard.currentY : singer.y;
  }

  startDrag(event: PointerEvent, singer: FormationStageSinger): void {
    if (!this.canMoveSinger(singer) || this.keyboardMoveSession()) {
      return;
    }

    if (event.button !== 0 || !this.stageElement) {
      return;
    }

    const target = event.currentTarget as HTMLElement;

    if (!this.stageElement.nativeElement.contains(target)) {
      return;
    }

    event.preventDefault();

    if (typeof target.setPointerCapture === 'function') {
      target.setPointerCapture(event.pointerId);
    }

    this.dragSession.set({
      singerId: singer.id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      initialX: singer.x,
      initialY: singer.y,
      currentX: singer.x,
      currentY: singer.y,
    });
  }

  moveSinger(event: PointerEvent): void {
    const session = this.dragSession();
    const stage = this.stageElement?.nativeElement;

    if (!session || !stage || session.pointerId !== event.pointerId) {
      return;
    }

    const bounds = stage.getBoundingClientRect();

    if (bounds.width <= 0 || bounds.height <= 0) {
      return;
    }

    const deltaX = ((event.clientX - session.startX) / bounds.width) * 100;
    const deltaY = ((event.clientY - session.startY) / bounds.height) * 100;

    this.dragSession.set({
      ...session,
      currentX: this.clamp(session.initialX + deltaX, 5, 95),
      currentY: this.clamp(session.initialY + deltaY, 8, 92),
    });
  }

  endDrag(event: PointerEvent): void {
    const session = this.dragSession();

    if (!session || session.pointerId !== event.pointerId) {
      return;
    }

    const target = event.currentTarget as HTMLElement;

    if (
      typeof target.hasPointerCapture === 'function' &&
      target.hasPointerCapture(event.pointerId) &&
      typeof target.releasePointerCapture === 'function'
    ) {
      target.releasePointerCapture(event.pointerId);
    }

    this.dragSession.set(null);

    if (session.currentX !== session.initialX || session.currentY !== session.initialY) {
      this.positionChanged.emit({
        singerId: session.singerId,
        x: session.currentX,
        y: session.currentY,
      });
    }
  }

  cancelDrag(event: PointerEvent): void {
    if (this.dragSession()?.pointerId !== event.pointerId) {
      return;
    }

    this.dragSession.set(null);
  }

  handleSingerKeydown(event: KeyboardEvent, singer: FormationStageSinger): void {
    const session = this.keyboardMoveSession();

    if (session) {
      if (session.singerId !== singer.id) {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
        case 'ArrowUp':
        case 'ArrowDown':
          event.preventDefault();
          this.moveWithKeyboard(event.key, event.shiftKey);
          return;
        case 'Enter':
        case ' ':
        case 'Spacebar':
          event.preventDefault();
          this.confirmKeyboardMove();
          return;
        case 'Tab':
          this.cancelKeyboardMove();
          return;
        case 'Escape':
          event.preventDefault();
          this.cancelKeyboardMove();
          return;
        default:
          return;
      }
    }

    if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'Spacebar') {
      return;
    }

    event.preventDefault();

    if (!this.canMoveSinger(singer)) {
      this.keyboardAnnouncement = singer.locked
        ? `${singer.displayName} tiene la posición bloqueada.`
        : 'No se puede mover este integrante en este momento.';
      return;
    }

    this.keyboardMoveSession.set({
      singerId: singer.id,
      initialX: singer.x,
      initialY: singer.y,
      currentX: singer.x,
      currentY: singer.y,
    });

    this.keyboardAnnouncement =
      `Moviendo a ${singer.displayName}. Usá las flechas para cambiar su posición. ` +
      'Usá Shift más una flecha para movimientos mayores. ' +
      'Enter o Espacio confirma. Escape cancela.';
  }

  private moveWithKeyboard(key: string, largeStep: boolean): void {
    const session = this.keyboardMoveSession();

    if (!session) {
      return;
    }

    const step = largeStep ? 5 : 1;
    let x = session.currentX;
    let y = session.currentY;

    if (key === 'ArrowLeft') {
      x -= step;
    } else if (key === 'ArrowRight') {
      x += step;
    } else if (key === 'ArrowUp') {
      y -= step;
    } else if (key === 'ArrowDown') {
      y += step;
    }

    x = this.clamp(x, 5, 95);
    y = this.clamp(y, 8, 92);

    this.keyboardMoveSession.set({
      ...session,
      currentX: x,
      currentY: y,
    });

    this.keyboardAnnouncement =
      `Posición provisional: horizontal ${Math.round(x)}%, vertical ${Math.round(y)}%. ` +
      'Enter confirma. Escape cancela.';
  }

  private confirmKeyboardMove(): void {
    const session = this.keyboardMoveSession();

    if (!session) {
      return;
    }

    this.keyboardMoveSession.set(null);

    if (session.currentX !== session.initialX || session.currentY !== session.initialY) {
      this.positionChanged.emit({
        singerId: session.singerId,
        x: session.currentX,
        y: session.currentY,
      });

      this.keyboardAnnouncement = `Posición de ${this.getSingerName(session.singerId)} confirmada. Guardá la formación para persistir el cambio.`;
    } else {
      this.keyboardAnnouncement = 'No se realizaron cambios en la posición.';
    }
  }

  private cancelKeyboardMove(): void {
    const session = this.keyboardMoveSession();

    if (!session) {
      return;
    }

    this.keyboardMoveSession.set(null);
    this.keyboardAnnouncement = `Movimiento de ${this.getSingerName(session.singerId)} cancelado. Se conservó la posición original.`;
  }

  private getSingerName(singerId: number): string {
    return this.singers.find((singer) => singer.id === singerId)?.displayName ?? 'El integrante';
  }

  private canMoveSinger(singer: FormationStageSinger): boolean {
    return (
      this.canEdit &&
      !singer.locked &&
      !this.saving &&
      !this.draftLoading &&
      !this.isLockMutationPending(singer.positionId)
    );
  }

  isLockMutationPending(positionId: number | null): boolean {
    return positionId !== null && this.pendingPositionIds.includes(positionId);
  }

  requestLockToggle(singer: FormationStageSinger): void {
    if (
      !this.canEdit ||
      singer.positionId === null ||
      this.isLockMutationPending(singer.positionId)
    ) {
      return;
    }

    this.toggleLock.emit(singer);
  }

  requestRemoval(singerId: number): void {
    if (!this.canEdit || this.saving || this.draftLoading) {
      return;
    }

    this.removeSinger.emit(singerId);
  }

  retryLoading(): void {
    this.retry.emit();
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
  }
}
