-- CreateEnum
CREATE TYPE "dispute_status" AS ENUM ('OPEN', 'REVIEW', 'RESOLVED');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('OPEN', 'REVIEW', 'CLOSED', 'VERIFYING', 'VERIFY_FAIL');

-- CreateEnum
CREATE TYPE "role" AS ENUM ('USER', 'SUPPORTER');

-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "expriedAt" TIMESTAMP(3),
    "walletAddress" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "reward" INTEGER NOT NULL DEFAULT 0,
    "poc" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isDraft" BOOLEAN NOT NULL DEFAULT false,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "applicationLink" TEXT,
    "skills" JSONB,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contracts" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tx_hash" TEXT NOT NULL,
    "party_a" TEXT NOT NULL,
    "party_b" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "inProgress" BOOLEAN NOT NULL DEFAULT false,
    "inDispute" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disputes" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tx_hash" TEXT NOT NULL,
    "party_a" TEXT NOT NULL,
    "party_b" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "submission" TEXT,
    "content" TEXT,
    "status" "status" NOT NULL,

    CONSTRAINT "disputes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dispute_messages" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "author" TEXT NOT NULL,
    "disputeId" TEXT NOT NULL,
    "content" TEXT,

    CONSTRAINT "dispute_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "photo" TEXT,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" "role" NOT NULL DEFAULT 'USER',
    "isTalentFilled" BOOLEAN NOT NULL DEFAULT false,
    "interests" TEXT,
    "bio" TEXT,
    "twitter" TEXT,
    "discord" TEXT,
    "github" TEXT,
    "linkedin" TEXT,
    "website" TEXT,
    "telegram" TEXT,
    "community" TEXT,
    "experience" TEXT,
    "level" TEXT,
    "location" TEXT,
    "cryptoExperience" TEXT,
    "workPrefernce" TEXT,
    "notifications" JSONB,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "skills" JSONB,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PoW" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "skills" JSONB,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subSkills" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "like" JSONB,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "ogImage" TEXT,

    CONSTRAINT "PoW_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE INDEX "jobs_id_idx" ON "jobs"("id");

-- CreateIndex
CREATE INDEX "jobs_walletAddress_idx" ON "jobs"("walletAddress");

-- CreateIndex
CREATE INDEX "jobs_isPublished_isPrivate_idx" ON "jobs"("isPublished", "isPrivate");

-- CreateIndex
CREATE INDEX "jobs_expriedAt_updatedAt_idx" ON "jobs"("expriedAt", "updatedAt");

-- CreateIndex
CREATE INDEX "jobs_title_idx" ON "jobs"("title");

-- CreateIndex
CREATE INDEX "Jobs_expriedAt_asc_idx" ON "jobs"("expriedAt" ASC);

-- CreateIndex
CREATE INDEX "Jobs_expriedAt_desc_idx" ON "jobs"("expriedAt" DESC);

-- CreateIndex
CREATE INDEX "jobs_isFeatured_idx" ON "jobs"("isFeatured" DESC);

-- CreateIndex
CREATE INDEX "jobs_isPublished_isActive_isArchived_idx" ON "jobs"("isPublished", "isActive", "isArchived");

-- CreateIndex
CREATE INDEX "jobs_isPublished_isActive_isArchived_isPrivate_idx" ON "jobs"("isPublished", "isActive", "isArchived", "isPrivate");

-- CreateIndex
CREATE INDEX "jobs_walletAddress_isArchived_isPublished_isActive_idx" ON "jobs"("walletAddress", "isArchived", "isPublished", "isActive");

-- CreateIndex
CREATE INDEX "contracts_id_idx" ON "contracts"("id");

-- CreateIndex
CREATE INDEX "contracts_party_a_party_b_idx" ON "contracts"("party_a", "party_b");

-- CreateIndex
CREATE INDEX "contracts_createdAt_updatedAt_idx" ON "contracts"("createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "disputes_id_idx" ON "disputes"("id");

-- CreateIndex
CREATE INDEX "disputes_party_a_party_b_idx" ON "disputes"("party_a", "party_b");

-- CreateIndex
CREATE INDEX "disputes_createdAt_updatedAt_idx" ON "disputes"("createdAt", "updatedAt");

-- CreateIndex
CREATE INDEX "dispute_messages_id_idx" ON "dispute_messages"("id");

-- CreateIndex
CREATE INDEX "dispute_messages_disputeId_idx" ON "dispute_messages"("disputeId");

-- CreateIndex
CREATE INDEX "dispute_messages_createdAt_updatedAt_idx" ON "dispute_messages"("createdAt", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "users_walletAddress_key" ON "users"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_username_idx" ON "users"("username");

-- CreateIndex
CREATE INDEX "users_firstName_idx" ON "users"("firstName");

-- CreateIndex
CREATE INDEX "users_lastName_idx" ON "users"("lastName");

-- CreateIndex
CREATE INDEX "users_location_idx" ON "users"("location");

-- CreateIndex
CREATE INDEX "PoW_userId_idx" ON "PoW"("userId");

-- CreateIndex
CREATE INDEX "PoW_createdAt_idx" ON "PoW"("createdAt");

-- CreateIndex
CREATE INDEX "PoW_likeCount_idx" ON "PoW"("likeCount");

-- CreateIndex
CREATE INDEX "PoW_likeCount_createdAt_idx" ON "PoW"("likeCount" DESC, "createdAt" DESC);

-- CreateIndex
CREATE INDEX "PoW_userId_createdAt_idx" ON "PoW"("userId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "PoW_userId_id_idx" ON "PoW"("userId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "dispute_messages" ADD CONSTRAINT "dispute_messages_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "disputes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoW" ADD CONSTRAINT "PoW_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
