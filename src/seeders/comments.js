import { faker } from "@faker-js/faker";
import { Comment } from "../models/index.js";
import { randomNumber } from "../utils/index.js";

export const createFakeComments = async (record) => {
    const fakeComments = [];
    for (let index = 0; index < record * 10; index++) {
        const name = faker.random.word();
        fakeComments.push({
            content: faker.lorem.paragraph(),
            TaskId: randomNumber(1, record),
            UserId: randomNumber(1, record),
        });
    }

    const comments = await Comment.bulkCreate(fakeComments);
};
