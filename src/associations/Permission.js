import { Permission, Resource, Role } from "../models/index.js";

Permission.belongsToMany(Role, {
    through: "role_permissions",
});
Permission.belongsToMany(Resource, {
    through: "permission_resources",
});

export default Permission;
