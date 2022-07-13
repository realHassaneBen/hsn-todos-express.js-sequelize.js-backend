import { Permission } from "../models/index.js";

const findAllPermissionsQuery = async (include = []) => {
    const permissions = await Permission.findAll({ include: [...include] });
    return permissions;
};

const findByPkPermissionQuery = (id) => {
    const permission = Permission.findByPk(id);
    return permission;
};
const findOnePermissionQuery = (where) => {
    const permission = Permission.findOne({ where });
    return permission;
};

const createPermissionQuery = async (permission) => {
    const { title, description, price, UserId, PermissionId, CategoryId } =
        permission;

    const createdPermission = await Permission.create({
        title,
        description,
        price,
        UserId,
        PermissionId,
        CategoryId,
    });
    await createdPermission.setUser(UserId);
    await createdPermission.setPermission(PermissionId);
    return createdPermission;
};

const updatePermissionQuery = async (id, permission) => {
    await Permission.update(permission, { where: { ...id } });
};

const deletePermissionQuery = async (id) => {
    await Permission.destroy({
        where: id,
    });
};

export {
    findAllPermissionsQuery,
    findByPkPermissionQuery,
    findOnePermissionQuery,
    createPermissionQuery,
    updatePermissionQuery,
    deletePermissionQuery,
};
