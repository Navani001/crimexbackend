import { PrismaClient } from "@prisma/client";
import logginSeed from "./seed/loginSeed";
import roleSeed from "./seed/roleSeed";

import QuestionSeed from "./seed/questinType";
import OptionShowSeed from "./seed/optionShowSeed";

import loginSeed from "./seed/loginSeed";
import OptionsSeed from "./seed/optionsSeed";
import OptionTypeSeed from "./seed/optionsTypeSeed";


const prisma = new PrismaClient();

async function main() {
  await roleSeed();
  await loginSeed();
    await OptionTypeSeed()
  await QuestionSeed();
  await OptionShowSeed();
  await logginSeed()


  await OptionsSeed();
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