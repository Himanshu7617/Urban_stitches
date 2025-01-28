-- AlterTable
ALTER TABLE "UserCart" ADD CONSTRAINT "UserCart_pkey" PRIMARY KEY ("userId", "productId");

-- DropIndex
DROP INDEX "UserCart_userId_productId_key";
