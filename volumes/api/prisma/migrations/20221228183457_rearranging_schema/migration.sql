/*
  Warnings:

  - You are about to drop the column `achievements` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `blocked` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `friendRequests` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `friends` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isNickSet` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `lastSecret` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `losses` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `secret` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `twoFactorAuth` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `wins` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `matches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rooms` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hash` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `nickname` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "matches" DROP CONSTRAINT "matches_playerId_fkey";

-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "achievements",
DROP COLUMN "blocked",
DROP COLUMN "email",
DROP COLUMN "friendRequests",
DROP COLUMN "friends",
DROP COLUMN "isNickSet",
DROP COLUMN "lastSecret",
DROP COLUMN "losses",
DROP COLUMN "secret",
DROP COLUMN "status",
DROP COLUMN "twoFactorAuth",
DROP COLUMN "wins",
ADD COLUMN     "hash" TEXT NOT NULL,
ALTER COLUMN "nickname" SET NOT NULL;

-- DropTable
DROP TABLE "matches";

-- DropTable
DROP TABLE "rooms";

-- DropEnum
DROP TYPE "MatchResult";

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "nickname" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "defaultAvatar" TEXT NOT NULL,
    "customAvatar" TEXT,
    "refreshTokenHash" TEXT,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_nickname_key" ON "clients"("nickname");
