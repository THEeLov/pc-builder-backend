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

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Motherboard" ADD CONSTRAINT "Motherboard_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Processor" ADD CONSTRAINT "Processor_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GPU" ADD CONSTRAINT "GPU_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RAM" ADD CONSTRAINT "RAM_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Storage" ADD CONSTRAINT "Storage_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PowerSupply" ADD CONSTRAINT "PowerSupply_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCCase" ADD CONSTRAINT "PCCase_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Component"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParcialPCConfiguration" ADD CONSTRAINT "ParcialPCConfiguration_motherboardId_fkey" FOREIGN KEY ("motherboardId") REFERENCES "Motherboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParcialPCConfiguration" ADD CONSTRAINT "ParcialPCConfiguration_processorId_fkey" FOREIGN KEY ("processorId") REFERENCES "Processor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParcialPCConfiguration" ADD CONSTRAINT "ParcialPCConfiguration_gpuId_fkey" FOREIGN KEY ("gpuId") REFERENCES "GPU"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParcialPCConfiguration" ADD CONSTRAINT "ParcialPCConfiguration_powerSupplyId_fkey" FOREIGN KEY ("powerSupplyId") REFERENCES "PowerSupply"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParcialPCConfiguration" ADD CONSTRAINT "ParcialPCConfiguration_pcCaseId_fkey" FOREIGN KEY ("pcCaseId") REFERENCES "PCCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParcialPCConfiguration" ADD CONSTRAINT "ParcialPCConfiguration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCConfiguration" ADD CONSTRAINT "PCConfiguration_motherboardId_fkey" FOREIGN KEY ("motherboardId") REFERENCES "Motherboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCConfiguration" ADD CONSTRAINT "PCConfiguration_processorId_fkey" FOREIGN KEY ("processorId") REFERENCES "Processor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCConfiguration" ADD CONSTRAINT "PCConfiguration_gpuId_fkey" FOREIGN KEY ("gpuId") REFERENCES "GPU"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCConfiguration" ADD CONSTRAINT "PCConfiguration_powerSupplyId_fkey" FOREIGN KEY ("powerSupplyId") REFERENCES "PowerSupply"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCConfiguration" ADD CONSTRAINT "PCConfiguration_pcCaseId_fkey" FOREIGN KEY ("pcCaseId") REFERENCES "PCCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PCConfiguration" ADD CONSTRAINT "PCConfiguration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
