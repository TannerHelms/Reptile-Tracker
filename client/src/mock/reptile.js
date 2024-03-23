
import { faker } from "@faker-js/faker"
const reptiles = [
    {
        id: 1,
        userId: 1,
        species: "ball_python",
        name: faker.person.firstName(),
        sex: faker.helpers.arrayElement(["m", "f"]),
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01")
    },
    {
        id: 2,
        userId: 1,
        species: "king_snake",
        name: faker.person.firstName(),
        sex: faker.helpers.arrayElement(["m", "f"]),
        createdAt: new Date("2024-01-02"),
        updatedAt: new Date("2024-01-02")
    },
    {
        id: 3,
        userId: 2,
        species: "corn_snake",
        name: faker.person.firstName(),
        sex: faker.helpers.arrayElement(["m", "f"]),
        createdAt: new Date("2024-01-03"),
        updatedAt: new Date("2024-01-03")
    },
    {
        id: 4,
        userId: 2,
        species: "redtail_boa",
        name: faker.person.firstName(),
        sex: faker.helpers.arrayElement(["m", "f"]),
        createdAt: new Date("2024-01-04"),
        updatedAt: new Date("2024-01-04")
    },
    {
        id: 5,
        userId: 3,
        species: "ball_python",
        name: faker.person.firstName(),
        sex: faker.helpers.arrayElement(["m", "f"]),
        createdAt: new Date("2024-01-05"),
        updatedAt: new Date("2024-01-05")
    }
];

export default reptiles;
for (let i = 6; i <= 10; i++) {
    const reptile = {
        id: i,
        userId: i,
        species: faker.helpers.arrayElement(["ball_python", "king_snake", "corn_snake", "redtail_boa"]),
        name: faker.person.firstName(),
        sex: faker.helpers.arrayElement(["m", "f"]),
        createdAt: faker.date.between({ from: "2024-01-01", to: "2024-12-31" }),
        updatedAt: faker.date.between({ from: "2024-01-01", to: "2024-12-31" }),
    };
    reptiles.push(reptile);
}