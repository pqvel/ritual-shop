-- CreateTable
CREATE TABLE "PortfolioProduct" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PortfolioProduct_pkey" PRIMARY KEY ("id")
);
