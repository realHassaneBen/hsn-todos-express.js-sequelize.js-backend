import { faker } from "@faker-js/faker";
import { Priority } from "../models/index.js";
import { randomNumber } from "../utils/index.js";

export const createFakePriorities = async (record) => {
    const fakePriorities = [];
    for (let index = 0; index < record; index++) {
        fakePriorities.push({
            name: faker.random.word(),
            query: faker.lorem.sentence(),
            TaskId: randomNumber(1, record),
            UserId: randomNumber(1, record),
        });
    }

    const priorities = await Priority.bulkCreate(fakePriorities);
};
