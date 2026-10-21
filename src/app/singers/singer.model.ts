export interface Singer {
  id: number;
  choirId: number;
  displayName: string;
  email: string | null;
  voicePart: string | null;
  voiceSectionId: number | null;
  mobility: string | null;
  restrictions: string | null;
  active: boolean;
}
