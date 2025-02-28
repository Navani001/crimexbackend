/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('completed', 'deleted', 'inProgress', 'yetToStart');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('admin', 'faculty', 'student');

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Login" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "logo" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "roleId" INTEGER NOT NULL,
    CONSTRAINT "Login_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptionShowType" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "OptionShowType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptionType" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "OptionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Survey" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "facultyId" INTEGER NOT NULL,
    "status" "Status" NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "groupId" INTEGER NOT NULL DEFAULT -1,
    "responseCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurveyQuestion" (
    "id" SERIAL NOT NULL,
    "questionTypeId" INTEGER NOT NULL,
    "surveyId" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT -1,
    "facultyDefinedOptionsId" INTEGER,
    "preDefinedOptionsId" INTEGER,
    "optionTypeId" INTEGER NOT NULL,
    "isOther" BOOLEAN NOT NULL DEFAULT false,
    "optionShowTypeId" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isMultiple" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SurveyQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreDefinedOptions" (
    "id" SERIAL NOT NULL,
    "optionTypeId" INTEGER NOT NULL,
    "option" TEXT NOT NULL,
    "priority" INTEGER,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PreDefinedOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatrixColumn" (
    "id" SERIAL NOT NULL,
    "columnName" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "MatrixColumn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FacultyCreatedOptions" (
    "id" SERIAL NOT NULL,
    "option" TEXT NOT NULL,
    "priority" INTEGER,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FacultyCreatedOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" "RoleType" NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "minimumRp" INTEGER NOT NULL DEFAULT 0,
    "maximumRp" INTEGER NOT NULL DEFAULT 1000000000,
    "skillId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OptionShowTypeSurveyQuestion" (
    "id" SERIAL NOT NULL,
    "surveyQuestionTypeId" INTEGER NOT NULL,
    "optionStatusId" INTEGER NOT NULL,

    CONSTRAINT "OptionShowTypeSurveyQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentSurveyResponse" (
    "id" SERIAL NOT NULL,
    "surveyQuestionId" INTEGER NOT NULL,
    "loginId" INTEGER NOT NULL,
    "preDefinedOptionId" INTEGER NOT NULL DEFAULT -1,
    "otherResponse" TEXT,
    "facultyOptionSelectedId" INTEGER NOT NULL DEFAULT -1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentSurveyResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Login_email_key" ON "Login"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- AddForeignKey
ALTER TABLE "Login" ADD CONSTRAINT "Login_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Login"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyQuestion" ADD CONSTRAINT "SurveyQuestion_questionTypeId_fkey" FOREIGN KEY ("questionTypeId") REFERENCES "QuestionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyQuestion" ADD CONSTRAINT "SurveyQuestion_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyQuestion" ADD CONSTRAINT "SurveyQuestion_optionTypeId_fkey" FOREIGN KEY ("optionTypeId") REFERENCES "OptionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyQuestion" ADD CONSTRAINT "SurveyQuestion_optionShowTypeId_fkey" FOREIGN KEY ("optionShowTypeId") REFERENCES "OptionShowType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyQuestion" ADD CONSTRAINT "SurveyQuestion_preDefinedOptionsId_fkey" FOREIGN KEY ("preDefinedOptionsId") REFERENCES "PreDefinedOptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyQuestion" ADD CONSTRAINT "SurveyQuestion_facultyDefinedOptionsId_fkey" FOREIGN KEY ("facultyDefinedOptionsId") REFERENCES "FacultyCreatedOptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreDefinedOptions" ADD CONSTRAINT "PreDefinedOptions_optionTypeId_fkey" FOREIGN KEY ("optionTypeId") REFERENCES "OptionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatrixColumn" ADD CONSTRAINT "MatrixColumn_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "SurveyQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptionShowTypeSurveyQuestion" ADD CONSTRAINT "OptionShowTypeSurveyQuestion_surveyQuestionTypeId_fkey" FOREIGN KEY ("surveyQuestionTypeId") REFERENCES "SurveyQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OptionShowTypeSurveyQuestion" ADD CONSTRAINT "OptionShowTypeSurveyQuestion_optionStatusId_fkey" FOREIGN KEY ("optionStatusId") REFERENCES "OptionShowType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSurveyResponse" ADD CONSTRAINT "StudentSurveyResponse_surveyQuestionId_fkey" FOREIGN KEY ("surveyQuestionId") REFERENCES "SurveyQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSurveyResponse" ADD CONSTRAINT "StudentSurveyResponse_loginId_fkey" FOREIGN KEY ("loginId") REFERENCES "Login"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSurveyResponse" ADD CONSTRAINT "StudentSurveyResponse_preDefinedOptionId_fkey" FOREIGN KEY ("preDefinedOptionId") REFERENCES "PreDefinedOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSurveyResponse" ADD CONSTRAINT "StudentSurveyResponse_facultyOptionSelectedId_fkey" FOREIGN KEY ("facultyOptionSelectedId") REFERENCES "FacultyCreatedOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
