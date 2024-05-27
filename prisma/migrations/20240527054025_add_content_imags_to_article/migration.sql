-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "contentImages" TEXT[] DEFAULT ARRAY[]::TEXT[];
