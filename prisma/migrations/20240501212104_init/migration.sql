-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "createdAt" TIMESTAMP,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
