import { FormationDraftPosition } from './formation-draft.model';
import { mapFormationStageSingers } from './formation-stage.mapper';
import { Singer } from '../singers/singer.model';

describe('mapFormationStageSingers', () => {
  const singers: Singer[] = [
    {
      id: 1,
      choirId: 10,
      displayName: 'Ana',
      email: null,
      voicePart: 'Soprano',
      voiceSectionId: 1,
      mobility: null,
      restrictions: null,
      active: true
    },
    {
      id: 2,
      choirId: 10,
      displayName: 'Bea',
      email: null,
      voicePart: 'Soprano',
      voiceSectionId: 1,
      mobility: null,
      restrictions: null,
      active: true
    },
    {
      id: 3,
      choirId: 10,
      displayName: 'Carla',
      email: null,
      voicePart: 'Contralto',
      voiceSectionId: 2,
      mobility: null,
      restrictions: null,
      active: true
    }
  ];

  it('calcula posiciones iniciales agrupando por sección vocal', () => {
    const result = mapFormationStageSingers(singers, [], {});

    expect(result).toHaveLength(3);
    expect(result[0].x).toBe(21.5);
    expect(result[1].x).toBe(40.5);
    expect(result[2].x).toBe(69);
    expect(result.every(singer => singer.y === 50)).toBe(true);
  });

  it('preserva las posiciones locales por encima de las iniciales', () => {
    const result = mapFormationStageSingers(
      singers,
      [],
      { 1: { x: 25, y: 35 } }
    );

    expect(result[0].x).toBe(25);
    expect(result[0].y).toBe(35);
    expect(result[1].x).toBe(40.5);
  });

  it('incorpora el identificador y el bloqueo de las posiciones del borrador', () => {
    const draftPositions: FormationDraftPosition[] = [
      {
        id: 80,
        singerId: 1,
        singerNameSnapshot: 'Ana',
        voicePartSnapshot: 'Soprano',
        voiceSectionIdSnapshot: 1,
        voiceSectionNameSnapshot: 'Sopranos',
        divisionNumberSnapshot: null,
        positionLabel: null,
        x: 40,
        y: 45,
        locked: true
      }
    ];

    const result = mapFormationStageSingers(singers, draftPositions, {});

    expect(result[0].positionId).toBe(80);
    expect(result[0].locked).toBe(true);
    expect(result[1].positionId).toBeNull();
    expect(result[1].locked).toBe(false);
  });

  it('usa una etiqueta alternativa cuando no hay sección vocal', () => {
    const result = mapFormationStageSingers(
      [{ ...singers[0], voicePart: null, voiceSectionId: null }],
      [],
      {}
    );

    expect(result[0].sectionLabel).toBe('Sección sin especificar');
  });

  it('devuelve una lista vacía para un elenco vacío', () => {
    expect(mapFormationStageSingers([], [], {})).toEqual([]);
  });
});
