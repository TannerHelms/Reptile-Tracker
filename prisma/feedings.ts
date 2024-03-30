import { faker } from "@faker-js/faker";
import { PrismaClient } from '@prisma/client';

const foodItems = ['crickets', 'mealworms', 'pinkies', 'greens', 'fish'];

async function CreateFeedings(db: PrismaClient, numReptiles: number) {
    for (let i = 1; i <= numReptiles; i++) {
        const numFeedings = faker.number.int({ min: 0, max: 5 });
        const reptileId = i;


        for (let j = 0; j < numFeedings; j++) {
            const foodItem = faker.helpers.arrayElement(foodItems);

            await db.feeding.create({
                data: {
                    reptileId,
                    foodItem,
                },
            });
        }
    }
}

export default CreateFeedings;