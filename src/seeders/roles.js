import { Role } from "../models/index.js";
import { ROLES } from "../constants/index.js";

export const createRoles = async () => {
    await Role.bulkCreate(ROLES);
};
