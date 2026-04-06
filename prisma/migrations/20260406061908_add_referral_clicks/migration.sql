-- CreateTable
CREATE TABLE "ReferralCode" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "influencer" TEXT NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 100,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReferralCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralClick" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "leadId" TEXT,
    "ip" TEXT,
    "device" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReferralClick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectLead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "idea" TEXT NOT NULL,
    "designPreference" TEXT NOT NULL,
    "brandingFiles" TEXT[],
    "paymentStatus" TEXT NOT NULL DEFAULT 'pending',
    "projectStatus" TEXT NOT NULL DEFAULT 'queued',
    "trackingCode" TEXT NOT NULL,
    "progressPercent" INTEGER NOT NULL DEFAULT 0,
    "invoiceUrl" TEXT,
    "referralSlug" TEXT,
    "finalPrice" INTEGER NOT NULL DEFAULT 800,
    "depositAmount" INTEGER NOT NULL DEFAULT 400,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectLead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReferralCode_slug_key" ON "ReferralCode"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectLead_trackingCode_key" ON "ProjectLead"("trackingCode");
