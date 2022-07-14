import { faker } from "@faker-js/faker";
import { Project } from "../models/index.js";
import { randomNumber } from "../utils/index.js";

export const createFakeProjects = async (record) => {
    const fakeProjects = [];
    for (let index = 0; index < record * 10; index++) {
        const name = faker.random.word();
        fakeProjects.push({
            name,
            UserId: randomNumber(1, record),
        });
    }

    const projects = await Project.bulkCreate(fakeProjects);
};
