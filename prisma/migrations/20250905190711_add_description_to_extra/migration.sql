/*
  Warnings:

  - Added the required column `updatedAt` to the `FAQItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Extra" ADD COLUMN "description" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FAQItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "page" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_FAQItem" ("answer", "createdAt", "id", "isActive", "order", "page", "question") SELECT "answer", "createdAt", "id", "isActive", "order", "page", "question" FROM "FAQItem";
DROP TABLE "FAQItem";
ALTER TABLE "new_FAQItem" RENAME TO "FAQItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
