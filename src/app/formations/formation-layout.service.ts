import { Injectable } from '@angular/core';
import { Singer } from '../singers/singer.model';

export interface FormationLayoutPosition {
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root'
})
export class FormationLayoutService {
  calculateInitialPositions(
    singers: readonly Singer[]
  ): Map<number, FormationLayoutPosition> {
    const groups = new Map<string, Singer[]>();

    for (const singer of singers) {
      const voicePart = singer.voicePart?.trim().toLocaleLowerCase() || '';
      const key = singer.voiceSectionId !== null
        ? `section:${singer.voiceSectionId}`
        : `voice:${voicePart || 'unknown'}`;

      const group = groups.get(key) ?? [];
      group.push(singer);
      groups.set(key, group);
    }

    const groupEntries = Array.from(groups.entries());
    const groupColumns = Math.min(
      3,
      Math.max(1, Math.ceil(Math.sqrt(groupEntries.length)))
    );
    const groupRows = Math.ceil(groupEntries.length / groupColumns);
    const cellWidth = 76 / groupColumns;
    const cellHeight = 64 / groupRows;
    const positions = new Map<number, FormationLayoutPosition>();

    groupEntries.forEach(([, members], groupIndex) => {
      const groupRow = Math.floor(groupIndex / groupColumns);
      const groupColumn = groupIndex % groupColumns;
      const memberColumns = Math.min(
        3,
        Math.max(1, Math.ceil(Math.sqrt(members.length)))
      );
      const memberRows = Math.ceil(members.length / memberColumns);

      members.forEach((singer, memberIndex) => {
        const row = Math.floor(memberIndex / memberColumns);
        const column = memberIndex % memberColumns;
        const rowLength = Math.min(
          memberColumns,
          members.length - row * memberColumns
        );

        positions.set(singer.id, {
          x: 12 + groupColumn * cellWidth
            + (column + 0.5) * cellWidth / rowLength,
          y: 18 + groupRow * cellHeight
            + (row + 0.5) * cellHeight / memberRows
        });
      });
    });

    return positions;
  }
}
