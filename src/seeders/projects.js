import { faker } from "@faker-js/faker";
import { Project } from "../models/index.js";
import { randomNumber } from "../utils/index.js";

export const createFakeProjects = async (record) => {
    const fakeProjects = [];
    for (let index = 0; index < record; index++) {
        fakeProjects.push({
            name: faker.random.word(),
            UserId: randomNumber(1, record),
        });
    }

    const projects = await Project.bulkCreate(fakeProjects);
};
