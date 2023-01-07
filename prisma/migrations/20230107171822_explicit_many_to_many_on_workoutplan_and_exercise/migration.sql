/*
  Warnings:

  - You are about to drop the `_ExerciseToWorkoutPlan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ExerciseToWorkoutPlan" DROP CONSTRAINT "_ExerciseToWorkoutPlan_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToWorkoutPlan" DROP CONSTRAINT "_ExerciseToWorkoutPlan_B_fkey";

-- DropTable
DROP TABLE "_ExerciseToWorkoutPlan";

-- CreateTable
CREATE TABLE "WorkoutPlanOnExercise" (
    "workoutPlanId" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "rest" INTEGER NOT NULL,
    "exerciseId" TEXT NOT NULL,

    CONSTRAINT "WorkoutPlanOnExercise_pkey" PRIMARY KEY ("workoutPlanId","exerciseId")
);

-- AddForeignKey
ALTER TABLE "WorkoutPlanOnExercise" ADD CONSTRAINT "WorkoutPlanOnExercise_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "WorkoutPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlanOnExercise" ADD CONSTRAINT "WorkoutPlanOnExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
