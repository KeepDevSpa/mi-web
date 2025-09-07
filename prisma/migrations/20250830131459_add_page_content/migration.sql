/*
  Warnings:

  - You are about to drop the column `whyChooseCtaText` on the `PageContent` table. All the data in the column will be lost.
  - Added the required column `faqCategories` to the `PageContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faqTitle` to the `PageContent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `services` to the `PageContent` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PageContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "servicesTitle" TEXT NOT NULL,
    "services" JSONB NOT NULL,
    "whyChooseTitle" TEXT NOT NULL,
    "whyChoosePoints" JSONB NOT NULL,
    "installationTitle" TEXT NOT NULL,
    "installationSubtitle" TEXT NOT NULL,
    "installationSteps" JSONB NOT NULL,
    "faqTitle" TEXT NOT NULL,
    "faqCategories" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_PageContent" ("createdAt", "id", "installationSteps", "installationSubtitle", "installationTitle", "servicesTitle", "updatedAt", "whyChoosePoints", "whyChooseTitle") SELECT "createdAt", "id", "installationSteps", "installationSubtitle", "installationTitle", "servicesTitle", "updatedAt", "whyChoosePoints", "whyChooseTitle" FROM "PageContent";
DROP TABLE "PageContent";
ALTER TABLE "new_PageContent" RENAME TO "PageContent";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
