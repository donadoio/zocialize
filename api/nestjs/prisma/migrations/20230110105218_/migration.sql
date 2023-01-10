-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastSocketId" TEXT,
    "username" TEXT NOT NULL,
    "usernameLowercase" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "hash" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'default',
    "profileColor" TEXT NOT NULL DEFAULT 'default',
    "refreshTokenHash" TEXT,
    "friends" INTEGER[],
    "blocked" INTEGER[],
    "friendRequests" INTEGER[],

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_usernameLowercase_key" ON "users"("usernameLowercase");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
