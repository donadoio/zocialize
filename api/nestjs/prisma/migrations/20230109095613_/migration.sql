-- AlterTable
ALTER TABLE "users" ADD COLUMN     "lastSocketId" TEXT;

-- CreateTable
CREATE TABLE "Friend" (
    "userFriendId" INTEGER NOT NULL,
    "userFriendUsername" TEXT NOT NULL,

    CONSTRAINT "Friend_pkey" PRIMARY KEY ("userFriendId")
);

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userFriendId_fkey" FOREIGN KEY ("userFriendId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
