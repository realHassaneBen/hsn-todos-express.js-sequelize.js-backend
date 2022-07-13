import { Role } from "../models/index.js";

const findAllRolesQuery = async (include = []) => {
    const roles = await Role.findAll({ include: [...include] });
    return roles;
};

const findByPkRoleQuery = (id) => {
    const role = Role.findByPk(id);
    return role;
};
const findOneRoleQuery = (where) => {
    const role = Role.findOne({ where });
    return role;
};

const createRoleQuery = async (role) => {
    const { title, description, price, UserId, RoleId, CategoryId } = role;

    const createdRole = await Role.create({
        title,
        description,
        price,
        UserId,
        RoleId,
        CategoryId,
    });
    await createdRole.setUser(UserId);
    await createdRole.setRole(RoleId);
    return createdRole;
};

const updateRoleQuery = async (id, role) => {
    await Role.update(role, { where: { ...id } });
};

const deleteRoleQuery = async (id) => {
    await Role.destroy({
        where: id,
    });
};

export {
    findAllRolesQuery,
    findByPkRoleQuery,
    findOneRoleQuery,
    createRoleQuery,
    updateRoleQuery,
    deleteRoleQuery,
};
