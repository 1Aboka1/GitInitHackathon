/*
  Warnings:

  - You are about to drop the column `equipmentId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `primaryMuscleId` on the `Exercise` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_equipmentId_fkey";

-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_primaryMuscleId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "equipmentId",
DROP COLUMN "primaryMuscleId";

-- CreateTable
CREATE TABLE "_ExerciseToPrimaryMuscle" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EquipmentToExercise" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToPrimaryMuscle_AB_unique" ON "_ExerciseToPrimaryMuscle"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToPrimaryMuscle_B_index" ON "_ExerciseToPrimaryMuscle"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EquipmentToExercise_AB_unique" ON "_EquipmentToExercise"("A", "B");

-- CreateIndex
CREATE INDEX "_EquipmentToExercise_B_index" ON "_EquipmentToExercise"("B");

-- AddForeignKey
ALTER TABLE "_ExerciseToPrimaryMuscle" ADD CONSTRAINT "_ExerciseToPrimaryMuscle_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToPrimaryMuscle" ADD CONSTRAINT "_ExerciseToPrimaryMuscle_B_fkey" FOREIGN KEY ("B") REFERENCES "PrimaryMuscle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToExercise" ADD CONSTRAINT "_EquipmentToExercise_A_fkey" FOREIGN KEY ("A") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToExercise" ADD CONSTRAINT "_EquipmentToExercise_B_fkey" FOREIGN KEY ("B") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
