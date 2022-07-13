import { Permission, Role } from "../models/index.js";
import { PERMISSIONS, ROLES } from "../constants/index.js";
import { findAllRolesQuery, findOneRoleQuery } from "../queries/roles.js";
import { findOnePermissionQuery } from "../queries/permissions.js";

export const createPermissions = async () => {
    await Permission.bulkCreate(PERMISSIONS);

    for (let index = 0; index < ROLES.length; index++) {
        const ROLE = ROLES[index];
        const permissions = ROLE.permissions;
        for (let index = 0; index < permissions.length; index++) {
            const permission = permissions[index];
            const perm = await findOnePermissionQuery({ name: permission });
            const Role = await findOneRoleQuery({ name: ROLE.name });
            await Role.addPermission(perm.id);
        }
    }
};
