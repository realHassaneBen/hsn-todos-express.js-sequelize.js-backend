import { Permission, Role, User } from "../models/index.js";

Role.belongsToMany(User, {
    through: "user_roles",
});
Role.belongsToMany(Permission, {
    through: "role_permissions",
});

export default Role;
