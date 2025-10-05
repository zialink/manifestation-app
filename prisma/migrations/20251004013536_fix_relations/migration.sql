/*
  Warnings:

  - You are about to drop the column `text` on the `Affirmation` table. All the data in the column will be lost.
  - You are about to drop the column `script` on the `Hypnosis` table. All the data in the column will be lost.
  - You are about to drop the column `scenario` on the `Imagination` table. All the data in the column will be lost.
  - Added the required column `content` to the `Affirmation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Affirmation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suggestionId` to the `GoalSuggestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `GoalSuggestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Hypnosis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Hypnosis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Imagination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Imagination` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Affirmation" DROP CONSTRAINT "Affirmation_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Hypnosis" DROP CONSTRAINT "Hypnosis_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Imagination" DROP CONSTRAINT "Imagination_userId_fkey";

-- AlterTable
ALTER TABLE "Affirmation" DROP COLUMN "text",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "GoalSuggestion" ADD COLUMN     "suggestionId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Hypnosis" DROP COLUMN "script",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Imagination" DROP COLUMN "scenario",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Affirmation" ADD CONSTRAINT "Affirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hypnosis" ADD CONSTRAINT "Hypnosis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagination" ADD CONSTRAINT "Imagination_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
