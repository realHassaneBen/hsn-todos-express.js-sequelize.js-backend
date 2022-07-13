import { Permission, Resource } from "../models/index.js";

Resource.belongsToMany(Permission, {
    through: "permission_resources",
});

export default Resource;
