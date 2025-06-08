/*
  Warnings:

  - You are about to drop the column `nextTurn` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `player` on the `Move` table. All the data in the column will be lost.
  - Added the required column `playerKey` to the `GameUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerId` to the `Move` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "nextTurn",
ADD COLUMN     "nextTurnPlayerId" TEXT;

-- AlterTable
ALTER TABLE "GameUser" ADD COLUMN     "playerKey" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Move" DROP COLUMN "player",
ADD COLUMN     "playerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_nextTurnPlayerId_fkey" FOREIGN KEY ("nextTurnPlayerId") REFERENCES "GameUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "GameUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
