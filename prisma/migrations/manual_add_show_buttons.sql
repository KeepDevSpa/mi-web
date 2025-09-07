-- Add showButtons column to HeroConfig table if it doesn't exist
PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

-- Check if the column exists and add it if it doesn't
CREATE TABLE IF NOT EXISTS "_temp_HeroConfig" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "page" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "subtitle" TEXT,
  "description" TEXT NOT NULL,
  "primaryCta" TEXT NOT NULL,
  "secondaryCta" TEXT NOT NULL,
  "heroImage" TEXT,
  "backgroundType" TEXT NOT NULL DEFAULT 'gradient',
  "variant" TEXT NOT NULL DEFAULT 'home',
  "highlights" TEXT,
  "showButtons" BOOLEAN NOT NULL DEFAULT true,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL
);

-- Copy data from the original table
INSERT INTO "_temp_HeroConfig" ("id", "page", "title", "subtitle", "description", "primaryCta", "secondaryCta", "heroImage", "backgroundType", "variant", "highlights", "isActive", "createdAt", "updatedAt")
SELECT "id", "page", "title", "subtitle", "description", "primaryCta", "secondaryCta", "heroImage", "backgroundType", "variant", "highlights", "isActive", "createdAt", "updatedAt"
FROM "HeroConfig";

-- Drop the original table
DROP TABLE "HeroConfig";

-- Rename the temporary table to the original name
ALTER TABLE "_temp_HeroConfig" RENAME TO "HeroConfig";

-- Create unique index for the page column
CREATE UNIQUE INDEX "HeroConfig_page_key" ON "HeroConfig"("page");

COMMIT;
PRAGMA foreign_keys=ON;
