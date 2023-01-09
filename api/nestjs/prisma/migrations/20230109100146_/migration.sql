/*
  Warnings:

  - The primary key for the `Friend` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userFriendId` on the `Friend` table. All the data in the column will be lost.
  - You are about to drop the column `userFriendUsername` on the `Friend` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Friend` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Friend` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_userFriendId_fkey";

-- AlterTable
ALTER TABLE "Friend" DROP CONSTRAINT "Friend_pkey",
DROP COLUMN "userFriendId",
DROP COLUMN "userFriendUsername",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ADD CONSTRAINT "Friend_pkey" PRIMARY KEY ("userId");

-- CreateTable
CREATE TABLE "FriendRequest" (
    "userId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "FriendRequest_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Blocked" (
    "userId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Blocked_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blocked" ADD CONSTRAINT "Blocked_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
