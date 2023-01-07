/*
  Warnings:

  - A unique constraint covering the columns `[userInfoId]` on the table `WorkoutPlan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userInfoId` to the `WorkoutPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutPlan" ADD COLUMN     "userInfoId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutPlan_userInfoId_key" ON "WorkoutPlan"("userInfoId");

-- AddForeignKey
ALTER TABLE "WorkoutPlan" ADD CONSTRAINT "WorkoutPlan_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "UserInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
