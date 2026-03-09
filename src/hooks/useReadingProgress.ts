// hooks/useReadingProgress.ts
"use client";

import { useCallback, useRef } from "react";

export const MILESTONES = [25, 50, 75, 100];

export function useReadingProgress(
  onScrollProgress?: (e: { percent: number; milestonesReached: number[] }) => void,
  onMilestoneReached?: (m: number, e: { percent: number; milestonesReached: number[] }) => void
) {
  const milestonesHitRef = useRef<Set<number>>(new Set());

  const updateProgress = useCallback(
    (percent: number) => {
      // clamp
      const p = Math.min(100, Math.max(0, Math.round(percent)));

      const newMilestones = MILESTONES.filter(
        (m) => p >= m && !milestonesHitRef.current.has(m)
      );

      newMilestones.forEach((m) => milestonesHitRef.current.add(m));

      const event = {
        percent: p,
        milestonesReached: [...milestonesHitRef.current].sort((a, b) => a - b),
      };

      onScrollProgress?.(event);
      newMilestones.forEach((m) => onMilestoneReached?.(m, event));

      return event;
    },
    [onScrollProgress, onMilestoneReached]
  );

  const reset = useCallback(() => {
    milestonesHitRef.current = new Set();
  }, []);

  return { updateProgress, reset };
}