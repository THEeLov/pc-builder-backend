/*
  Warnings:

  - The primary key for the `Component` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `GPU` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Motherboard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PCCase` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PCConfiguration` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ParcialPCConfiguration` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PowerSupply` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Processor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `RAM` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Storage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "GPU" DROP CONSTRAINT "GPU_componentId_fkey";

-- DropForeignKey
ALTER TABLE "Motherboard" DROP CONSTRAINT "Motherboard_componentId_fkey";

-- DropForeignKey
ALTER TABLE "PCCase" DROP CONSTRAINT "PCCase_componentId_fkey";

-- DropForeignKey
ALTER TABLE "PCConfiguration" DROP CONSTRAINT "PCConfiguration_gpuId_fkey";

-- DropForeignKey
ALTER TABLE "PCConfiguration" DROP CONSTRAINT "PCConfiguration_motherboardId_fkey";

-- DropForeignKey
ALTER TABLE "PCConfiguration" DROP CONSTRAINT "PCConfiguration_pcCaseId_fkey";

-- DropForeignKey
ALTER TABLE "PCConfiguration" DROP CONSTRAINT "PCConfiguration_powerSupplyId_fkey";

-- DropForeignKey
ALTER TABLE "PCConfiguration" DROP CONSTRAINT "PCConfiguration_processorId_fkey";

-- DropForeignKey
ALTER TABLE "PCConfiguration" DROP CONSTRAINT "PCConfiguration_userId_fkey";

-- DropForeignKey
ALTER TABLE "ParcialPCConfiguration" DROP CONSTRAINT "ParcialPCConfiguration_gpuId_fkey";

-- DropForeignKey
ALTER TABLE "ParcialPCConfiguration" DROP CONSTRAINT "ParcialPCConfiguration_motherboardId_fkey";

-- DropForeignKey
ALTER TABLE "ParcialPCConfiguration" DROP CONSTRAINT "ParcialPCConfiguration_pcCaseId_fkey";

-- DropForeignKey
ALTER TABLE "ParcialPCConfiguration" DROP CONSTRAINT "ParcialPCConfiguration_powerSupplyId_fkey";

-- DropForeignKey
ALTER TABLE "ParcialPCConfiguration" DROP CONSTRAINT "ParcialPCConfiguration_processorId_fkey";

-- DropForeignKey
ALTER TABLE "ParcialPCConfiguration" DROP CONSTRAINT "ParcialPCConfiguration_userId_fkey";

-- DropForeignKey
ALTER TABLE "PowerSupply" DROP CONSTRAINT "PowerSupply_componentId_fkey";

-- DropForeignKey
ALTER TABLE "Processor" DROP CONSTRAINT "Processor_componentId_fkey";

-- DropForeignKey
ALTER TABLE "RAM" DROP CONSTRAINT "RAM_componentId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Storage" DROP CONSTRAINT "Storage_componentId_fkey";

-- DropForeignKey
ALTER TABLE "_PCConfigurationToRAM" DROP CONSTRAINT "_PCConfigurationToRAM_A_fkey";

-- DropForeignKey
ALTER TABLE "_PCConfigurationToRAM" DROP CONSTRAINT "_PCConfigurationToRAM_B_fkey";

-- DropForeignKey
ALTER TABLE "_PCConfigurationToStorage" DROP CONSTRAINT "_PCConfigurationToStorage_A_fkey";

-- DropForeignKey
ALTER TABLE "_PCConfigurationToStorage" DROP CONSTRAINT "_PCConfigurationToStorage_B_fkey";

-- DropForeignKey
ALTER TABLE "_ParcialPCConfigurationToRAM" DROP CONSTRAINT "_ParcialPCConfigurationToRAM_A_fkey";

-- DropForeignKey
ALTER TABLE "_ParcialPCConfigurationToRAM" DROP CONSTRAINT "_ParcialPCConfigurationToRAM_B_fkey";

-- DropForeignKey
ALTER TABLE "_ParcialPCConfigurationToStorage" DROP CONSTRAINT "_ParcialPCConfigurationToStorage_A_fkey";

-- DropForeignKey
ALTER TABLE "_ParcialPCConfigurationToStorage" DROP CONSTRAINT "_ParcialPCConfigurationToStorage_B_fkey";

-- AlterTable
ALTER TABLE "Component" DROP CONSTRAINT "Component_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Component_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Component_id_seq";

-- AlterTable
ALTER TABLE "GPU" DROP CONSTRAINT "GPU_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "componentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "GPU_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "GPU_id_seq";

-- AlterTable
ALTER TABLE "Motherboard" DROP CONSTRAINT "Motherboard_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "componentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Motherboard_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Motherboard_id_seq";

-- AlterTable
ALTER TABLE "PCCase" DROP CONSTRAINT "PCCase_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "componentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PCCase_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PCCase_id_seq";

-- AlterTable
ALTER TABLE "PCConfiguration" DROP CONSTRAINT "PCConfiguration_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "motherboardId" SET DATA TYPE TEXT,
ALTER COLUMN "processorId" SET DATA TYPE TEXT,
ALTER COLUMN "gpuId" SET DATA TYPE TEXT,
ALTER COLUMN "powerSupplyId" SET DATA TYPE TEXT,
ALTER COLUMN "pcCaseId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PCConfiguration_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PCConfiguration_id_seq";

-- AlterTable
ALTER TABLE "ParcialPCConfiguration" DROP CONSTRAINT "ParcialPCConfiguration_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "motherboardId" SET DATA TYPE TEXT,
ALTER COLUMN "processorId" SET DATA TYPE TEXT,
ALTER COLUMN "gpuId" SET DATA TYPE TEXT,
ALTER COLUMN "powerSupplyId" SET DATA TYPE TEXT,
ALTER COLUMN "pcCaseId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ParcialPCConfiguration_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ParcialPCConfiguration_id_seq";

-- AlterTable
ALTER TABLE "PowerSupply" DROP CONSTRAINT "PowerSupply_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "componentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PowerSupply_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PowerSupply_id_seq";

-- AlterTable
ALTER TABLE "Processor" DROP CONSTRAINT "Processor_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "componentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Processor_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Processor_id_seq";

-- AlterTable
ALTER TABLE "RAM" DROP CONSTRAINT "RAM_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "componentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "RAM_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "RAM_id_seq";

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Storage" DROP CONSTRAINT "Storage_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "componentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Storage_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Storage_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "_PCConfigurationToRAM" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_PCConfigurationToStorage" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_ParcialPCConfigurationToRAM" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_ParcialPCConfigurationToStorage" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motherboard" ADD CONSTRAINT "Motherboard_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Processor" ADD CONSTRAINT "Processor_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GPU" ADD CONSTRAINT "GPU_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RAM" ADD CONSTRAINT "RAM_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Storage" ADD CONSTRAINT "Storage_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PowerSupply" ADD CONSTRAINT "PowerSupply_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCCase" ADD CONSTRAINT "PCCase_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParcialPCConfiguration" ADD CONSTRAINT "ParcialPCConfiguration_motherboardId_fkey" FOREIGN KEY ("motherboardId") REFERENCES "Motherboard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParcialPCConfiguration" ADD CONSTRAINT "ParcialPCConfiguration_processorId_fkey" FOREIGN KEY ("processorId") REFERENCES "Processor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParcialPCConfiguration" ADD CONSTRAINT "ParcialPCConfiguration_gpuId_fkey" FOREIGN KEY ("gpuId") REFERENCES "GPU"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParcialPCConfiguration" ADD CONSTRAINT "ParcialPCConfiguration_powerSupplyId_fkey" FOREIGN KEY ("powerSupplyId") REFERENCES "PowerSupply"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParcialPCConfiguration" ADD CONSTRAINT "ParcialPCConfiguration_pcCaseId_fkey" FOREIGN KEY ("pcCaseId") REFERENCES "PCCase"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParcialPCConfiguration" ADD CONSTRAINT "ParcialPCConfiguration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCConfiguration" ADD CONSTRAINT "PCConfiguration_motherboardId_fkey" FOREIGN KEY ("motherboardId") REFERENCES "Motherboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCConfiguration" ADD CONSTRAINT "PCConfiguration_processorId_fkey" FOREIGN KEY ("processorId") REFERENCES "Processor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCConfiguration" ADD CONSTRAINT "PCConfiguration_gpuId_fkey" FOREIGN KEY ("gpuId") REFERENCES "GPU"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCConfiguration" ADD CONSTRAINT "PCConfiguration_powerSupplyId_fkey" FOREIGN KEY ("powerSupplyId") REFERENCES "PowerSupply"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCConfiguration" ADD CONSTRAINT "PCConfiguration_pcCaseId_fkey" FOREIGN KEY ("pcCaseId") REFERENCES "PCCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCConfiguration" ADD CONSTRAINT "PCConfiguration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParcialPCConfigurationToRAM" ADD CONSTRAINT "_ParcialPCConfigurationToRAM_A_fkey" FOREIGN KEY ("A") REFERENCES "ParcialPCConfiguration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParcialPCConfigurationToRAM" ADD CONSTRAINT "_ParcialPCConfigurationToRAM_B_fkey" FOREIGN KEY ("B") REFERENCES "RAM"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParcialPCConfigurationToStorage" ADD CONSTRAINT "_ParcialPCConfigurationToStorage_A_fkey" FOREIGN KEY ("A") REFERENCES "ParcialPCConfiguration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParcialPCConfigurationToStorage" ADD CONSTRAINT "_ParcialPCConfigurationToStorage_B_fkey" FOREIGN KEY ("B") REFERENCES "Storage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PCConfigurationToRAM" ADD CONSTRAINT "_PCConfigurationToRAM_A_fkey" FOREIGN KEY ("A") REFERENCES "PCConfiguration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PCConfigurationToRAM" ADD CONSTRAINT "_PCConfigurationToRAM_B_fkey" FOREIGN KEY ("B") REFERENCES "RAM"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PCConfigurationToStorage" ADD CONSTRAINT "_PCConfigurationToStorage_A_fkey" FOREIGN KEY ("A") REFERENCES "PCConfiguration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PCConfigurationToStorage" ADD CONSTRAINT "_PCConfigurationToStorage_B_fkey" FOREIGN KEY ("B") REFERENCES "Storage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
