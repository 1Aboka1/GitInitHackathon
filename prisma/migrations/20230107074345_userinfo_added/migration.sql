-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('MuscleGain', 'FatLoss', 'Maintanence', 'None');

-- CreateTable
CREATE TABLE "UserInfo" (
    "id" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "goal" "Goal" NOT NULL DEFAULT 'None',
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_userId_key" ON "UserInfo"("userId");

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
