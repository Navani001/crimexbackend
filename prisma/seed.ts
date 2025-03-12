import { PrismaClient } from "@prisma/client";
import loginSeed from "./seed/loginSeed";
const prisma = new PrismaClient();
async function main() {
  await loginSeed();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });