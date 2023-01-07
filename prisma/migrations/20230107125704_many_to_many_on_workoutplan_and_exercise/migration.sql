/*
  Warnings:

  - You are about to drop the `BuiltExercise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BuiltExercise" DROP CONSTRAINT "BuiltExercise_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "BuiltExercise" DROP CONSTRAINT "BuiltExercise_workoutPlanId_fkey";

-- DropTable
DROP TABLE "BuiltExercise";

-- CreateTable
CREATE TABLE "_ExerciseToWorkoutPlan" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToWorkoutPlan_AB_unique" ON "_ExerciseToWorkoutPlan"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToWorkoutPlan_B_index" ON "_ExerciseToWorkoutPlan"("B");

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkoutPlan" ADD CONSTRAINT "_ExerciseToWorkoutPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToWorkoutPlan" ADD CONSTRAINT "_ExerciseToWorkoutPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "WorkoutPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
