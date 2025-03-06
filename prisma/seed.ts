import { PrismaClient } from "@prisma/client";
import logginSeed from "./seed/loginSeed";
import roleSeed from "./seed/roleSeed";

import QuestionSeed from "./seed/questinType";
import OptionShowSeed from "./seed/optionShowSeed";

import loginSeed from "./seed/loginSeed";
import OptionsSeed from "./seed/optionsSeed";
import OptionTypeSeed from "./seed/optionsTypeSeed";
import skillSeed from "./seed/skillSeed";
import skillstudentSeed from "./seed/skillstudentseed";
import skillLevelSeed from "./seed/skilllevel";
import DepartmentSeed from "./seed/departmentSeed";


const prisma = new PrismaClient();

async function main() {
  await DepartmentSeed()
  console.log("one")
  await roleSeed();
  console.log("two")
  await loginSeed();
  console.log("three")
  await OptionTypeSeed()
  console.log("four")
  await QuestionSeed();
  console.log("five")
  await OptionShowSeed();
  console.log("six")
  await logginSeed()
  console.log("seven")
  await skillSeed()
  console.log("eight")
  await OptionsSeed();
  console.log("nine")
  await skillLevelSeed()
  console.log("ten")
  await skillstudentSeed()
  console.log("eleven")
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