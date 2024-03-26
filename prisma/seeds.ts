import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { config } from "dotenv";
import * as bcrypt from "bcryptjs";
import CreateReptiles from './reptiles';
config();


async function main() {


  await prisma.user.upsert({
    where: {
      id: 1,
    },
    create: {
      firstName: "SITE",
      lastName: "ADMIN",
      email: process.env.ADMIN_EMAIL!!,
      password_hash: bcrypt.hashSync(process.env.ADMIN_PASSWORD!!),
      profile: {
        create: {
          id: 1,
        }
      }
    },
    update: {
      email: process.env.ADMIN_EMAIL!!,
      password_hash: bcrypt.hashSync(process.env.ADMIN_PASSWORD!!),
    }
  })
  // await CreateReptiles(prisma, 10);
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