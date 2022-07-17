import { createFakeUsers, createUsers } from "./users.js";
import { createRoles } from "./roles.js";
import { createPermissions } from "./permissions.js";
import { createResources } from "./resources.js";
import { seedersConfig } from "../config/seeders.js";
import { createFakeTasks } from "./tasks.js";
import { createFakeProjects } from "./projects.js";
import { createFakeLabels } from "./labels.js";
import { createFakePriorities } from "./priorities.js";
import { createFakeComments } from "./comments.js";

const RECORD = seedersConfig.amount;

/**
 *
 */
const dbSeed = async () => {
    await createRoles();
    await createPermissions();
    await createResources();
    await createUsers();
};

/**
 *
 */
const dbSeedFake = async () => {
    await createFakeUsers(RECORD);
    await createFakePriorities(RECORD);
    await createFakeProjects(RECORD);
    await createFakeTasks(RECORD);
    await createFakeComments(RECORD);
    await createFakeLabels(RECORD);

    // await createFakeStudents(RECORD);
};

export { dbSeed, dbSeedFake };
