/*
  Warnings:

  - You are about to drop the column `description` on the `Extra` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "MobileTariff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "dataAmount" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "originalPrice" REAL,
    "features" JSONB NOT NULL,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "isHighlighted" BOOLEAN NOT NULL DEFAULT false,
    "hasOperatorChoice" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ContactLead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "message" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ProcessStep" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Advantage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "icon" TEXT,
    "order" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "author" TEXT NOT NULL,
    "role" TEXT,
    "content" TEXT NOT NULL,
    "image" TEXT,
    "order" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SiteConfig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contactPhone" TEXT NOT NULL DEFAULT '1560',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Extra" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "pricingCardId" TEXT NOT NULL,
    CONSTRAINT "Extra_pricingCardId_fkey" FOREIGN KEY ("pricingCardId") REFERENCES "PricingCard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Extra" ("id", "label", "price", "pricingCardId") SELECT "id", "label", "price", "pricingCardId" FROM "Extra";
DROP TABLE "Extra";
ALTER TABLE "new_Extra" RENAME TO "Extra";
CREATE TABLE "new_PricingCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "selectorKey" TEXT,
    "currentPrice" REAL NOT NULL,
    "originalPrice" REAL,
    "variant" TEXT NOT NULL DEFAULT 'blue',
    "hasSpeedSelector" BOOLEAN NOT NULL DEFAULT false,
    "features" JSONB NOT NULL,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "ctaText" TEXT,
    "rateTier" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isHeroOffer" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "operator" TEXT,
    "hasOperatorChoice" BOOLEAN NOT NULL DEFAULT false,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "isVIP" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_PricingCard" ("createdAt", "ctaText", "currentPrice", "features", "hasSpeedSelector", "id", "isActive", "isHeroOffer", "isPopular", "name", "originalPrice", "page", "rateTier", "selectorKey", "updatedAt", "variant") SELECT "createdAt", "ctaText", "currentPrice", "features", "hasSpeedSelector", "id", "isActive", "isHeroOffer", "isPopular", "name", "originalPrice", "page", "rateTier", "selectorKey", "updatedAt", "variant" FROM "PricingCard";
DROP TABLE "PricingCard";
ALTER TABLE "new_PricingCard" RENAME TO "PricingCard";
CREATE TABLE "new_Speed" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "originalPrice" REAL,
    "pricingCardId" TEXT NOT NULL,
    CONSTRAINT "Speed_pricingCardId_fkey" FOREIGN KEY ("pricingCardId") REFERENCES "PricingCard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Speed" ("id", "label", "originalPrice", "price", "pricingCardId") SELECT "id", "label", "originalPrice", "price", "pricingCardId" FROM "Speed";
DROP TABLE "Speed";
ALTER TABLE "new_Speed" RENAME TO "Speed";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
