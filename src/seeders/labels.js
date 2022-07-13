import { faker } from "@faker-js/faker";
import { Label } from "../models/index.js";
import { randomNumber } from "../utils/index.js";

export const createFakeLabels = async (record) => {
    const fakeLabels = [];
    for (let index = 0; index < record; index++) {
        fakeLabels.push({
            name: faker.random.word(),
            TaskId: randomNumber(1, record),
            UserId: randomNumber(1, record),
        });
    }

    const labels = await Label.bulkCreate(fakeLabels);
};
