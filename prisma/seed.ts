import { PrismaClient } from "@prisma/client";
import logginSeed from "./seed/loginSeed";
import roleSeed from "./seed/roleSeed";

import QuestionSeed from "./seed/questinType";
import OptionShowSeed from "./seed/optionShowSeed";

import loginSeed from "./seed/loginSeed";
import OptionsSeed from "./seed/optionsSeed";
import OptionTypeSeed from "./seed/optionsTypeSeed";
import skillSeed from "./seed/skillSeed";


const prisma = new PrismaClient();

async function main() {
  await roleSeed();
  console.log("one")
  await loginSeed();
  console.log("two")
  await OptionTypeSeed()
  console.log("three")
  await QuestionSeed();
  console.log("four")
  await OptionShowSeed();
  console.log("five")
  await logginSeed()
  console.log("six")
  await skillSeed()
  console.log("seven")
  await OptionsSeed();
  console.log("eight")

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