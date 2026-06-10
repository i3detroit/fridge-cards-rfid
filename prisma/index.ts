import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma-app/client";

const adapter = new PrismaBetterSqlite3({
    url: "file:./prisma/database.sqlite",
});
export const prisma = new PrismaClient({ adapter });