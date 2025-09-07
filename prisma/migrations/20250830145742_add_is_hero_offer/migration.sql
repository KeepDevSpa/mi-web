-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    "isPopular" BOOLEAN NOT NULL,
    "ctaText" TEXT NOT NULL,
    "rateTier" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isHeroOffer" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_PricingCard" ("createdAt", "ctaText", "currentPrice", "extras", "features", "hasSpeedSelector", "id", "isActive", "isPopular", "name", "originalPrice", "page", "rateTier", "speeds", "updatedAt", "variant") SELECT "createdAt", "ctaText", "currentPrice", "extras", "features", "hasSpeedSelector", "id", "isActive", "isPopular", "name", "originalPrice", "page", "rateTier", "speeds", "updatedAt", "variant" FROM "PricingCard";
DROP TABLE "PricingCard";
ALTER TABLE "new_PricingCard" RENAME TO "PricingCard";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
