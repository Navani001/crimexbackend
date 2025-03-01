import { PrismaClient } from "@prisma/client";
import logginSeed from "./seed/loginSeed";
import roleSeed from "./seed/roleSeed";
import optionSeed from "./seed/optionSeed";
import QuestionSeed from "./seed/questinType";
import OptionShowSeed from "./seed/optionShowSeed";
import preDifinedOptionSeed from "./seed/preDifinedOptionSeed";


const prisma = new PrismaClient();

async function main() {
  await roleSeed();
  await logginSeed();
  await optionSeed()
  await QuestionSeed()
  await OptionShowSeed()
  await preDifinedOptionSeed()
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