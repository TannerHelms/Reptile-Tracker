import { faker } from "@faker-js/faker"

function generateFeedings(num) {
    const feedings = [];

    for (let i = 0; i < num; i++) {
        const feeding = {
            id: 1,
            reptileId: 1,
            foodItem: faker.word(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent()
        };

        feedings.push(feeding);
    }

    return feedings;
}

export default generateFeedings;