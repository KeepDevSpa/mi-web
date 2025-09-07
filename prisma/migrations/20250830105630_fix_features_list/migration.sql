-- CreateTable
CREATE TABLE "PricingCard" (
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
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PageContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "servicesTitle" TEXT NOT NULL,
    "whyChooseTitle" TEXT NOT NULL,
    "whyChooseCtaText" TEXT NOT NULL,
    "whyChoosePoints" JSONB NOT NULL,
    "installationTitle" TEXT NOT NULL,
    "installationSubtitle" TEXT NOT NULL,
    "installationSteps" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "planName" TEXT NOT NULL,
    "planPrice" REAL NOT NULL,
    "telefono" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'new',
    "nombre" TEXT,
    "codigoPostal" TEXT,
    "email" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SiteConfig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contactPhone" TEXT NOT NULL DEFAULT '915691382',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
