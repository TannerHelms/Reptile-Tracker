import { faker } from "@faker-js/faker";

const feedingSchedule = {
    id: 1,
    reptileId: 1,
    userId: 1,
    type: "feed",
    description: "Feed the reptile",
    monday: faker.datatype.boolean(),
    tuesday: faker.datatype.boolean(),
    wednesday: faker.datatype.boolean(),
    thursday: faker.datatype.boolean(),
    friday: faker.datatype.boolean(),
    saturday: faker.datatype.boolean(),
    sunday: faker.datatype.boolean(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent()
};

const cleaningSchedule = {
    id: 2,
    reptileId: 1,
    userId: 1,
    type: "clean",
    description: "Clean the reptile's enclosure",
    monday: faker.datatype.boolean(),
    tuesday: faker.datatype.boolean(),
    wednesday: faker.datatype.boolean(),
    thursday: faker.datatype.boolean(),
    friday: faker.datatype.boolean(),
    saturday: faker.datatype.boolean(),
    sunday: faker.datatype.boolean(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent()
};

const recordSchedule = {
    id: 3,
    reptileId: 2,
    userId: 1,
    type: "record",
    description: "Record the reptile's weight and length",
    monday: faker.datatype.boolean(),
    tuesday: faker.datatype.boolean(),
    wednesday: faker.datatype.boolean(),
    thursday: faker.datatype.boolean(),
    friday: faker.datatype.boolean(),
    saturday: faker.datatype.boolean(),
    sunday: faker.datatype.boolean(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent()
};

const reptile = {
    id: 1,
    userId: 1,
    species: "ball_python",
    name: faker.person.firstName(),
    sex: faker.helpers.arrayElement(["m", "f"]),
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
}


const reptile2 = {
    id: 2,
    userId: 1,
    species: "king_snake",
    name: faker.person.firstName(),
    sex: faker.helpers.arrayElement(["m", "f"]),
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02")
}

const reptile3 = {
    id: 3,
    userId: 1,
    species: "king_snake",
    name: faker.person.firstName(),
    sex: faker.helpers.arrayElement(["m", "f"]),
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02")
}
const reptile4 = {
    id: 4,
    userId: 1,
    species: "corn_snake",
    name: faker.person.firstName(),
    sex: faker.helpers.arrayElement(["m", "f"]),
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03")
}

const reptile5 = {
    id: 5,
    userId: 1,
    species: "leopard_gecko",
    name: faker.person.firstName(),
    sex: faker.helpers.arrayElement(["m", "f"]),
    createdAt: new Date("2024-01-04"),
    updatedAt: new Date("2024-01-04")
}

const reptile6 = {
    id: 6,
    userId: 1,
    species: "bearded_dragon",
    name: faker.person.firstName(),
    sex: faker.helpers.arrayElement(["m", "f"]),
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05")
}

const Schedule = [
    { reptile, schedules: [feedingSchedule, cleaningSchedule, recordSchedule] },
    { reptile: reptile2, schedules: [feedingSchedule, cleaningSchedule, recordSchedule] },
    { reptile: reptile3, schedules: [feedingSchedule, cleaningSchedule, recordSchedule] },
    { reptile: reptile4, schedules: [feedingSchedule, cleaningSchedule, recordSchedule] },
    { reptile: reptile5, schedules: [feedingSchedule, cleaningSchedule, recordSchedule] },
    { reptile: reptile6, schedules: [feedingSchedule, cleaningSchedule, recordSchedule] }
];


export default Schedule;