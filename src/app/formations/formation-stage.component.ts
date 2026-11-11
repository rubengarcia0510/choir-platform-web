import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
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

@Component({
  selector: 'app-formation-stage',
  standalone: true,
  templateUrl: './formation-stage.component.html',
  styleUrl: './formation-stage.component.scss'
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

  @Output() readonly positionChanged =
    new EventEmitter<{ singerId: number; x: number; y: number }>();

  @Output() readonly removeSinger = new EventEmitter<number>();
  @Output() readonly toggleLock = new EventEmitter<FormationStageSinger>();
  @Output() readonly retry = new EventEmitter<void>();

  @ViewChild('stage')
  private stageElement?: ElementRef<HTMLElement>;

  private dragSession: DragSession | null = null;

  startDrag(event: PointerEvent, singer: FormationStageSinger): void {
    if (!this.canEdit || singer.locked || this.saving || this.draftLoading) {
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

    this.dragSession = {
      singerId: singer.id,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      initialX: singer.x,
      initialY: singer.y,
      currentX: singer.x,
      currentY: singer.y
    };
  }

  moveSinger(event: PointerEvent): void {
    const session = this.dragSession;
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

    session.currentX = this.clamp(session.initialX + deltaX);
    session.currentY = this.clamp(session.initialY + deltaY);
  }

  endDrag(event: PointerEvent): void {
    const session = this.dragSession;

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

    this.dragSession = null;

    if (
      session.currentX !== session.initialX ||
      session.currentY !== session.initialY
    ) {
      this.positionChanged.emit({
        singerId: session.singerId,
        x: session.currentX,
        y: session.currentY
      });
    }
  }

  cancelDrag(event: PointerEvent): void {
    if (this.dragSession?.pointerId !== event.pointerId) {
      return;
    }

    this.dragSession = null;
  }

  isLockMutationPending(positionId: number | null): boolean {
    return positionId !== null &&
      this.pendingPositionIds.includes(positionId);
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

  private clamp(value: number): number {
    return Math.max(0, Math.min(100, value));
  }
}
