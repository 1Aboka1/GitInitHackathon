/*
  Warnings:

  - Added the required column `gender` to the `UserInfo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- AlterTable
ALTER TABLE "UserInfo" ADD COLUMN     "gender" "Gender" NOT NULL;
