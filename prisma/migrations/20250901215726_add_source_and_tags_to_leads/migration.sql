/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FAQ` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `page` on the `ContentBlock` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `InformationCard` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `formName` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `components` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `showInHeader` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `extraOptionsCount` on the `PricingCard` table. All the data in the column will be lost.
  - You are about to drop the column `extras` on the `PricingCard` table. All the data in the column will be lost.
  - You are about to drop the column `showExtraDropdowns` on the `PricingCard` table. All the data in the column will be lost.
  - You are about to drop the column `speeds` on the `PricingCard` table. All the data in the column will be lost.
  - Added the required column `pageId` to the `ContentBlock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `InformationCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Admin_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Admin";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FAQ";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Speed" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "originalPrice" REAL,
    "pricingCardId" TEXT NOT NULL,
    CONSTRAINT "Speed_pricingCardId_fkey" FOREIGN KEY ("pricingCardId") REFERENCES "PricingCard" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Extra" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT,
    "pricingCardId" TEXT NOT NULL,
    CONSTRAINT "Extra_pricingCardId_fkey" FOREIGN KEY ("pricingCardId") REFERENCES "PricingCard" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FAQItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "page" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "PageSelector" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "page" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "HeroConfig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "page" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT NOT NULL,
    "primaryCta" JSONB NOT NULL,
    "secondaryCta" JSONB NOT NULL,
    "heroImage" TEXT,
    "backgroundType" TEXT NOT NULL DEFAULT 'gradient',
    "variant" TEXT NOT NULL DEFAULT 'home',
    "highlights" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "NavigationConfig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "parent" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "MediaAsset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "category" TEXT,
    "alt" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ContentBlock" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pageId" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT,
    "ctaText" TEXT,
    "ctaLink" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ContentBlock_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ContentBlock" ("content", "createdAt", "id", "isActive", "order", "section", "title", "updatedAt") SELECT "content", "createdAt", "id", "isActive", "order", "section", "title", "updatedAt" FROM "ContentBlock";
DROP TABLE "ContentBlock";
ALTER TABLE "new_ContentBlock" RENAME TO "ContentBlock";
CREATE TABLE "new_InformationCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "page" TEXT NOT NULL,
    "section" TEXT,
    "icon" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT,
    "imageUrl" TEXT,
    "linkUrl" TEXT,
    "backgroundColor" TEXT,
    "textColor" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_InformationCard" ("backgroundColor", "content", "createdAt", "id", "imageUrl", "isActive", "linkUrl", "order", "page", "section", "textColor", "title") SELECT "backgroundColor", "content", "createdAt", "id", "imageUrl", "isActive", "linkUrl", "order", "page", "section", "textColor", "title" FROM "InformationCard";
DROP TABLE "InformationCard";
ALTER TABLE "new_InformationCard" RENAME TO "InformationCard";
CREATE TABLE "new_Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "message" TEXT,
    "page" TEXT NOT NULL,
    "source" TEXT,
    "tags" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Lead" ("createdAt", "id", "page") SELECT "createdAt", "id", "page" FROM "Lead";
DROP TABLE "Lead";
ALTER TABLE "new_Lead" RENAME TO "Lead";
CREATE TABLE "new_Page" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Page" ("createdAt", "id", "slug", "title", "updatedAt") SELECT "createdAt", "id", "slug", "title", "updatedAt" FROM "Page";
DROP TABLE "Page";
ALTER TABLE "new_Page" RENAME TO "Page";
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");
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
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_PricingCard" ("createdAt", "ctaText", "currentPrice", "features", "hasSpeedSelector", "id", "isActive", "isHeroOffer", "isPopular", "name", "originalPrice", "page", "rateTier", "updatedAt", "variant") SELECT "createdAt", "ctaText", "currentPrice", "features", "hasSpeedSelector", "id", "isActive", "isHeroOffer", "isPopular", "name", "originalPrice", "page", "rateTier", "updatedAt", "variant" FROM "PricingCard";
DROP TABLE "PricingCard";
ALTER TABLE "new_PricingCard" RENAME TO "PricingCard";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "PageSelector_page_key_key" ON "PageSelector"("page", "key");

-- CreateIndex
CREATE UNIQUE INDEX "HeroConfig_page_key" ON "HeroConfig"("page");
