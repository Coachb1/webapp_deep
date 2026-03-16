// hooks/useReadingProgress.ts
"use client";

import { useCallback, useRef, useEffect } from "react";
import {
  trackConceptProgressStart,
  trackConceptProgressUpdate,
  trackConceptProgressComplete,
  getTrackedConceptProgress,
} from "@/lib/api";

export const MILESTONES = [10, 25, 50, 75, 100]; // Added 10% milestone

export function useReadingProgress(
  onScrollProgress?: (e: { percent: number; milestonesReached: number[] }) => void,
  onMilestoneReached?: (m: number, e: { percent: number; milestonesReached: number[] }) => void,
  userId?: string, // Added userId for tracking
  case_mapping_id?: string // Added case_mapping_id for tracking
) {
  const milestonesHitRef = useRef<Set<number>>(new Set());
  const hasStartedTrackingRef = useRef(false); // To track if the 'start' event has been sent
  const initialProgressFetchedRef = useRef(false); // New ref to track if initial progress has been fetched
  const highestPercentageReachedRef = useRef(0); // Track the highest percentage reached for API updates and internal logic

  // Effect to fetch initial progress when the component mounts or userId/case_mapping_id change
  useEffect(() => {
    const fetchInitialProgress = async () => {
      if (userId && case_mapping_id && !initialProgressFetchedRef.current) {
        try {
          const data = await getTrackedConceptProgress(userId, case_mapping_id);
          if (data && data.completion_percentage !== undefined) {
            const fetchedPercentage = data.completion_percentage;
            highestPercentageReachedRef.current = fetchedPercentage; // Set initial highest percentage
            // Mark all milestones up to the fetched percentage as hit
            MILESTONES.forEach(m => {
              if (fetchedPercentage >= m) {
                milestonesHitRef.current.add(m);
              }
            });
            if (fetchedPercentage > 0) {
              hasStartedTrackingRef.current = true;
            }
            console.log(`Initial progress fetched: ${fetchedPercentage}%. Milestones hit:`, [...milestonesHitRef.current]);

            // Explicitly trigger UI update for initial progress
            const initialEvent = {
              percent: fetchedPercentage,
              milestonesReached: [...milestonesHitRef.current].sort((a, b) => a - b),
            };
            onScrollProgress?.(initialEvent);

            // Trigger onMilestoneReached for all initially hit milestones
            MILESTONES.forEach(m => {
              if (fetchedPercentage >= m) {
                onMilestoneReached?.(m, initialEvent);
              }
            });
          }
        } catch (error) {
          console.error("Error fetching initial concept progress:", error);
        } finally {
          initialProgressFetchedRef.current = true;
        }
      }
    };

    fetchInitialProgress();
  }, [userId, case_mapping_id]); // Re-run if userId or case_mapping_id changes

  const updateProgress = useCallback(
    (percent: number) => {
      // clamp
      const rawPercentage = Math.min(100, Math.max(0, Math.round(percent)));

      let p = rawPercentage;
      // If initial progress has been fetched and the current scroll is less than the highest recorded,
      // clamp 'p' to the highest recorded. Otherwise, update highest.
      if (initialProgressFetchedRef.current && userId && case_mapping_id && p < highestPercentageReachedRef.current) {
        p = highestPercentageReachedRef.current;
      } else if (p > highestPercentageReachedRef.current) {
        highestPercentageReachedRef.current = p; // Update highest if current is higher
      }

      console.debug("Updating progress:", { percent: p, userId, case_mapping_id, highestReached: highestPercentageReachedRef.current, initialFetched: initialProgressFetchedRef.current });

      const currentMilestones = [...milestonesHitRef.current].sort((a, b) => a - b);
      const event = {
        percent: p,
        milestonesReached: currentMilestones,
      };

      onScrollProgress?.(event);

      // Only proceed with API tracking if initial progress has been fetched and user/case_mapping_id are present
      if (initialProgressFetchedRef.current && userId && case_mapping_id) {
        if (!hasStartedTrackingRef.current && p > 0) { // Start tracking only if progress is > 0
          trackConceptProgressStart(userId, case_mapping_id);
          hasStartedTrackingRef.current = true;
        }

        const newMilestones = MILESTONES.filter(
          (m) => p >= m && !milestonesHitRef.current.has(m)
        );

        newMilestones.forEach((m) => milestonesHitRef.current.add(m));
        newMilestones.forEach((m) => {
          trackConceptProgressUpdate(userId, case_mapping_id, m); // Send the milestone percentage
          onMilestoneReached?.(m, event); // Use the same event object
        });

        if (p >= 80 && hasStartedTrackingRef.current) { // Complete tracking at 80% or more
          trackConceptProgressComplete(userId, case_mapping_id);
          hasStartedTrackingRef.current = false; // Reset after completion
        }
      }

      return event;
    }, [onScrollProgress, onMilestoneReached, userId, case_mapping_id, initialProgressFetchedRef.current]
  );

  const reset = useCallback(() => {
    milestonesHitRef.current = new Set();
    // Reset tracking state when the progress is reset
    if (userId && case_mapping_id && hasStartedTrackingRef.current) {
      // Optionally, you might want to send a 'cancel' or 'reset' event if your backend supports it
    }
    initialProgressFetchedRef.current = false; // Reset initial fetch status on reset
    hasStartedTrackingRef.current = false;
  }, [userId, case_mapping_id]);

  return { updateProgress, reset };
}