import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const CreateSchedules
    = async (db: PrismaClient, reptileCt: number) => {
        for (let i = 1; i <= reptileCt; i++) {
            const reptileId = i;
            const userId = 1;
            const scheduleCount = faker.number.int({ min: 1, max: 3 });

            for (let j = 0; j < scheduleCount; j++) {
                const type = faker.helpers.arrayElement(["feed", "record", "clean"]);
                const description = faker.lorem.sentence();
                const monday = faker.datatype.boolean();
                const tuesday = faker.datatype.boolean();
                const wednesday = faker.datatype.boolean();
                const thursday = faker.datatype.boolean();
                const friday = faker.datatype.boolean();
                const saturday = faker.datatype.boolean();
                const sunday = faker.datatype.boolean();

                await db.schedule.create({
                    data: {
                        reptileId,
                        userId,
                        type,
                        description,
                        monday,
                        tuesday,
                        wednesday,
                        thursday,
                        friday,
                        saturday,
                        sunday,
                    },
                });
            }
        }
    }

export default CreateSchedules
    ;