import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { config } from "dotenv";
import * as bcrypt from "bcryptjs";
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
  // TODO: put default data in the database
  // Seed reptile data
  await prisma.reptile.createMany({
    data: [
      {
        userId: 1, // Assuming the admin user has userId 1
        species: "ball_python",
        name: "Peter",
        sex: "m"
      },
      {
        userId: 1,
        species: "corn_snake",
        name: "Cornelia",
        sex: "f"
      },
      // Add more reptile data as needed
    ],
  });
  console.log(process.env);
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