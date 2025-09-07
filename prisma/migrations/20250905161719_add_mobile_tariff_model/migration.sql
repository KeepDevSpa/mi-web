-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MobileTariff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "subtitle" TEXT,
    "type" TEXT NOT NULL DEFAULT 'eleccion',
    "dataAmount" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "originalPrice" REAL,
    "features" JSONB NOT NULL,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "isHighlighted" BOOLEAN NOT NULL DEFAULT false,
    "hasOperatorChoice" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_MobileTariff" ("createdAt", "dataAmount", "features", "hasOperatorChoice", "id", "isActive", "isHighlighted", "isPopular", "name", "order", "originalPrice", "price", "subtitle", "type", "updatedAt") SELECT "createdAt", "dataAmount", "features", "hasOperatorChoice", "id", "isActive", "isHighlighted", "isPopular", "name", "order", "originalPrice", "price", "subtitle", "type", "updatedAt" FROM "MobileTariff";
DROP TABLE "MobileTariff";
ALTER TABLE "new_MobileTariff" RENAME TO "MobileTariff";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
