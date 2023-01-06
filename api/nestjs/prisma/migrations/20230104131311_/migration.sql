/*
  Warnings:

  - You are about to drop the column `customAvatar` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `defaultAvatar` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "customAvatar",
DROP COLUMN "defaultAvatar",
ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT 'default',
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "profileColor" TEXT NOT NULL DEFAULT 'default';

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
