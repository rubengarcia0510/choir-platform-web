import { FormationDraftPosition } from './formation-draft.model';
import { FormationStageSinger } from './formation-stage.model';
import { Singer } from '../singers/singer.model';

export type FormationStagePositionOverrides = Record<
  number,
  { x: number; y: number }
>;

export function mapFormationStageSingers(
  singers: Singer[],
  draftPositions: FormationDraftPosition[],
  positionOverrides: FormationStagePositionOverrides
): FormationStageSinger[] {
  const draftPositionsBySinger = new Map(
    draftPositions.map(position => [position.singerId, position] as const)
  );

  const groups = new Map<string, Singer[]>();

  for (const singer of singers) {
    const key = getSectionKey(singer);
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
  const initialPositions = new Map<number, { x: number; y: number }>();

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

      initialPositions.set(singer.id, {
        x: 12 + groupColumn * cellWidth
          + (column + 0.5) * cellWidth / rowLength,
        y: 18 + groupRow * cellHeight
          + (row + 0.5) * cellHeight / memberRows
      });
    });
  });

  return singers.map(singer => {
    const initial = initialPositions.get(singer.id)!;
    const override = positionOverrides[singer.id];
    const draftPosition = draftPositionsBySinger.get(singer.id);

    return {
      ...singer,
      positionId: draftPosition?.id ?? null,
      locked: draftPosition?.locked ?? false,
      x: override?.x ?? initial.x,
      y: override?.y ?? initial.y,
      sectionLabel: singer.voicePart?.trim()
        || 'Sección sin especificar',
      sectionHue: getSectionHue(getSectionKey(singer))
    };
  });
}

function getSectionKey(singer: Singer): string {
  const voicePart = singer.voicePart?.trim().toLocaleLowerCase() || '';

  return singer.voiceSectionId !== null
    ? `section:${singer.voiceSectionId}`
    : `voice:${voicePart || 'unknown'}`;
}

function getSectionHue(key: string): number {
  let hash = 0;

  for (let index = 0; index < key.length; index++) {
    hash = (hash * 31 + key.charCodeAt(index)) >>> 0;
  }

  return hash % 360;
}
