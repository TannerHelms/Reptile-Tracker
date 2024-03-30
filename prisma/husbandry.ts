import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";


async function CreateHusbandryRecords(db: PrismaClient, numReptiles: number) {

    const numRecords = faker.number.int({ min: 0, max: 5 });

    for (let i = 1; i <= numReptiles; i++) {
        for (let j = 0; j < numRecords; j++) {

            await db.husbandryRecord.create({
                data: {
                    reptileId: i,
                    length: faker.number.float(),
                    weight: faker.number.float(),
                    temperature: faker.number.float(),
                    humidity: faker.number.float(),
                    createdAt: faker.date.recent(),
                    updatedAt: faker.date.recent(),
                },
            });


        }
    }

}

export default CreateHusbandryRecords;