import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { config } from "dotenv";
import * as bcrypt from "bcryptjs";
import CreateReptiles from './reptiles';
import CreateSchedules from './schedules';
import CreateFeedings from './feedings';
import CreateHusbandryRecords from './husbandry';
config();


async function main() {


  await prisma.user.upsert({
    where: {
      email: process.env.ADMIN_EMAIL!!,
    },
    create: {
      firstName: "SITE",
      lastName: "ADMIN",
      email: process.env.ADMIN_EMAIL!!,
      password_hash: bcrypt.hashSync(process.env.ADMIN_PASSWORD!!),
      profile: {
        create: {

        }
      }
    },
    update: {
      email: process.env.ADMIN_EMAIL!!,
      password_hash: bcrypt.hashSync(process.env.ADMIN_PASSWORD!!),
    }
  })

  const reptileCount = 10;

  await CreateReptiles(prisma, reptileCount);
  await CreateSchedules(prisma, reptileCount);
  await CreateFeedings(prisma, reptileCount);
  await CreateHusbandryRecords(prisma, reptileCount);

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })