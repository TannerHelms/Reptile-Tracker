import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const CreateSchedules
    = async (db: PrismaClient, reptileCt: number) => {
        for (let i = 1; i <= reptileCt; i++) {
            const scheduleCount = faker.number.int({ min: 1, max: 3 });

            for (let j = 0; j < scheduleCount; j++) {
                await db.schedule.create({
                    data: {
                        reptileId: 1,
                        userId: 1,
                        type: faker.helpers.arrayElement(["feed", "record", "clean"]),
                        description: faker.lorem.sentence(),
                        monday: faker.datatype.boolean(),
                        tuesday: faker.datatype.boolean(),
                        wednesday: faker.datatype.boolean(),
                        thursday: faker.datatype.boolean(),
                        friday: faker.datatype.boolean(),
                        saturday: faker.datatype.boolean(),
                        sunday: faker.datatype.boolean(),
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                });
            }
        }
    }

export default CreateSchedules
    ;