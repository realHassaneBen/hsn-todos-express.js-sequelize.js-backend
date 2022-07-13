import { faker } from "@faker-js/faker";
import { Task } from "../models/index.js";
import { randomNumber } from "../utils/index.js";

export const createFakeTasks = async (record) => {
    const fakeTasks = [];
    for (let index = 0; index < record; index++) {
        fakeTasks.push({
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            due_date: faker.date.future(),
            ProjectId: randomNumber(1, record),
            UserId: randomNumber(1, record),
        });
    }

    const tasks = await Task.bulkCreate(fakeTasks);
};
