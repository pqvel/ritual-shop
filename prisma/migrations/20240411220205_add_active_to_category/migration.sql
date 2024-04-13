/*
  Warnings:

  - Made the column `parentId` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parentId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "parentId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
