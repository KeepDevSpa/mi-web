/*
  Warnings:

  - You are about to drop the `PageContent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SiteConfig` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `codigoPostal` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `planName` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `planPrice` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `telefono` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `Lead` table. All the data in the column will be lost.
  - Added the required column `data` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formName` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `page` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PageContent";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SiteConfig";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "InformationCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT,
    "backgroundColor" TEXT NOT NULL DEFAULT '#ffffff',
    "textColor" TEXT NOT NULL DEFAULT '#000000',
    "linkUrl" TEXT,
    "page" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "showInHeader" BOOLEAN NOT NULL DEFAULT true,
    "components" JSONB NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ContentBlock" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "formName" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "data" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Lead" ("createdAt", "id", "status", "updatedAt") SELECT "createdAt", "id", "status", "updatedAt" FROM "Lead";
DROP TABLE "Lead";
ALTER TABLE "new_Lead" RENAME TO "Lead";
CREATE TABLE "new_PricingCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "currentPrice" REAL NOT NULL,
    "originalPrice" REAL NOT NULL,
    "variant" TEXT NOT NULL,
    "hasSpeedSelector" BOOLEAN NOT NULL,
    "speeds" JSONB NOT NULL,
    "features" JSONB NOT NULL,
    "extras" JSONB NOT NULL,
    "extraOptionsCount" INTEGER NOT NULL DEFAULT -1,
    "showExtraDropdowns" BOOLEAN NOT NULL DEFAULT false,
    "isPopular" BOOLEAN NOT NULL,
    "isHeroOffer" BOOLEAN NOT NULL DEFAULT false,
    "ctaText" TEXT NOT NULL,
    "rateTier" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_PricingCard" ("createdAt", "ctaText", "currentPrice", "extras", "features", "hasSpeedSelector", "id", "isActive", "isHeroOffer", "isPopular", "name", "originalPrice", "page", "rateTier", "speeds", "updatedAt", "variant") SELECT "createdAt", "ctaText", "currentPrice", "extras", "features", "hasSpeedSelector", "id", "isActive", "isHeroOffer", "isPopular", "name", "originalPrice", "page", "rateTier", "speeds", "updatedAt", "variant" FROM "PricingCard";
DROP TABLE "PricingCard";
ALTER TABLE "new_PricingCard" RENAME TO "PricingCard";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");
