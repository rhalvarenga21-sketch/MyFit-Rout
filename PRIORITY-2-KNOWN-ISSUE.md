# ⚠️ PRIORITY 2: KNOWN ISSUE

## ActiveWorkout Component Crash

**Status:** ❌ **Component crashes on load due to data structure mismatch**

### Root Cause:
The `ActiveWorkout` component was built expecting `workout.exercises[]` array, but `PresetWorkout` interface actually has:
- `warmupIds: string[]`
- `mainBlockIds: string[]`
- `accessoryIds: string[]`
- `cooldownIds: string[]`

### What Works:
✅ Workout catalog navigation  
✅ Workout summary screen  
✅ Database save function (`completeWorkoutSession`)  
✅ CompletedWorkoutSummary component  
✅ UI/UX design for active workout

### What Needs Fixing:
1. ActiveWorkout component needs to:
   - Concatenate all exercise IDs from warmup + main + accessory + cooldown
   - Convert each ID to full exercise data from EXERCISE_LIBRARY
   - Extract sets/reps from the Exercise object properly (reps is a string like "8-12", not a number)

2. Update PresetWorkout type to include exercise metadata, OR
3. Refactor ActiveWorkout to work with existing PresetWorkout structure

### Quick Fix Option (Not Implemented):
```typescript
// In ActiveWorkout, line ~37:
const allExerciseIds = [
  ...workout.warmupIds,
  ...workout.mainBlockIds,
  ...workout.accessoryIds,
  ...workout.cooldownIds
];

const allExercises = allExerciseIds.map(id => EXERCISE_LIBRARY.find(ex => ex.id === id)).filter(Boolean);
```

---

## Decision:
Per user request to avoid looping on same error, **proceeding to Priority 3: AI Coach Integration** instead of fixing this now.

The workout tracking infrastructure (database functions, UI components,state management) is 90% complete. Only the data mapping layer needs adjustment.

---

## Estimated Fix Time: 
15-30 minutes to refactor ActiveWorkout to work with PresetWorkout structure.

**Recommendation:** Fix in next session or as part of P3 when integrating AI workout  suggestions.
