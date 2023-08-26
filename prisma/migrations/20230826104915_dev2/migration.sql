/*
  Warnings:

  - A unique constraint covering the columns `[balanceId]` on the table `transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "transaction_balanceId_key" ON "transaction"("balanceId");
