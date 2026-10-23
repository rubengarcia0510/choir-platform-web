export interface Concert {
  id: number;
  choirId: number;
  title: string;
  concertDate: string;
  venue: string | null;
  status: string;
}

export interface ConcertRepertoireEntry {
  concertId: number;
  repertoireItemId: number;
  orderIndex: number;
  durationMinutes: number | null;
  stageRequirements: string | null;
  title: string;
  composer: string | null;
  arranger: string | null;
}

export interface FormationSummary {
  id: number;
  name: string;
  description: string | null;
}

export interface CreateFormationRequest {
  name: string;
  description?: string | null;
}

export interface CreateFormationResponse extends FormationSummary {
  draftVersionId: number;
  versionNumber: number;
  status: string;
}

export interface FormationDraftPosition {
  id: number;
  singerId: number;
  singerNameSnapshot: string | null;
  voicePartSnapshot: string | null;
  voiceSectionIdSnapshot: number | null;
  voiceSectionNameSnapshot: string | null;
  divisionNumberSnapshot: number | null;
  positionLabel: string | null;
  x: number;
  y: number;
}

export interface FormationDraft {
  formationId: number;
  name: string;
  description: string | null;
  draftVersionId: number;
  versionNumber: number;
  status: string;
  notes: string | null;
  createdAt: string | null;
  positions: FormationDraftPosition[];
}

export interface SaveFormationDraftPositionsRequest {
  positions: Array<{
    singerId: number;
    positionLabel?: string | null;
    x: number;
    y: number;
  }>;
}
