/*
  Warnings:

  - Added the required column `role` to the `Login` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Login" ADD COLUMN     "role" "RoleType" NOT NULL;
