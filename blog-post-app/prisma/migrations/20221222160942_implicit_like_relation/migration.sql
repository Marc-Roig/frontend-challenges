/*
  Warnings:

  - You are about to drop the `CommentLike` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CommentLike";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_CommentToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CommentToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CommentToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CommentToUser_AB_unique" ON "_CommentToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CommentToUser_B_index" ON "_CommentToUser"("B");
