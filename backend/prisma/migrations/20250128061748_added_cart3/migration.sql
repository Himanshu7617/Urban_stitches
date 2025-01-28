/*
  Warnings:

  - The primary key for the `UserCart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,productId]` on the table `UserCart` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserCart" DROP CONSTRAINT "UserCart_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "UserCart_userId_productId_key" ON "UserCart"("userId", "productId");
