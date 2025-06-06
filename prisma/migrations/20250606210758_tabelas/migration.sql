/*
  Warnings:

  - Made the column `leadorigin` on table `Leads` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Leads" ALTER COLUMN "leadorigin" SET NOT NULL;
