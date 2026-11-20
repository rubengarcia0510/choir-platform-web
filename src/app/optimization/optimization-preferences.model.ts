export interface OptimizationPreferences {
  distance: number;
  crossings: number;
  compactness: number;
  sectionContinuity: number;
}

export type UpdateOptimizationPreferencesRequest = OptimizationPreferences;

export const DEFAULT_OPTIMIZATION_PREFERENCES: OptimizationPreferences = {
  distance: 25,
  crossings: 25,
  compactness: 25,
  sectionContinuity: 25
};
