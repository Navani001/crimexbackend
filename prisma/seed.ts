import { PrismaClient } from "@prisma/client";
import logginSeed from "./seed/loginSeed";
import roleSeed from "./seed/roleSeed";
import optionSeed from "./seed/optionSeed";
import QuestionSeed from "./seed/questinType";


const prisma = new PrismaClient();

async function main() {
  await roleSeed();
  await logginSeed();
  await optionSeed()
  await QuestionSeed()
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