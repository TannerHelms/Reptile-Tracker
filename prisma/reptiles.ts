import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const CreateReptiles = async (db: PrismaClient, ct: number) => {
    for (let i = 1; i <= ct; i++) {
        await db.reptile.upsert({
            where: {
                id: i,
            },
            create: {
                id: i,
                userId: 1,
                species: faker.helpers.arrayElement(["ball_python", "king_snake", "corn_snake", "redtail_boa"]),
                name: faker.person.firstName(),
                sex: faker.helpers.arrayElement(["m", "f"]),
                createdAt: new Date(`2024-01-0${i}`),
                updatedAt: new Date(`2024-01-0${i}`),
            },
            update: {},
        });
    }
}

export default CreateReptiles;