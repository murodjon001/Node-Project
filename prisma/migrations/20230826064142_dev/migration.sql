-- CreateEnum
CREATE TYPE "Operation" AS ENUM ('EXPENSE', 'INCOME');

-- CreateEnum
CREATE TYPE "Colors" AS ENUM ('RED', 'GREEN');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'RUB', 'UZS');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(200) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallet" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "colors" "Colors" NOT NULL DEFAULT 'GREEN',
    "currency" "Currency" NOT NULL DEFAULT 'USD',
    "description" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "colors" "Colors" NOT NULL DEFAULT 'GREEN',
    "operation" "Operation" NOT NULL DEFAULT 'INCOME',
    "description" TEXT,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,
    "categoryId" INTEGER NOT NULL,
    "walletId" INTEGER NOT NULL,
    "balanceId" INTEGER NOT NULL,
    "unique" TEXT NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "total_balance" (
    "id" SERIAL NOT NULL,
    "balance" INTEGER NOT NULL,
    "expence" INTEGER NOT NULL,
    "income" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "unique" TEXT NOT NULL,

    CONSTRAINT "total_balance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "wallet_userId_key" ON "wallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- AddForeignKey
ALTER TABLE "wallet" ADD CONSTRAINT "wallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_balanceId_fkey" FOREIGN KEY ("balanceId") REFERENCES "total_balance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "total_balance" ADD CONSTRAINT "total_balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
