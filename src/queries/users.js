import { User } from "../scopes/index.js";

export const findAllUsersQuery = async (scope) => {
    return await User.scope(scope).findAll();
};
export const findByPkUserQuery = async (id, scope) => {
    return await User.scope(scope).findByPk(id);
};
export const findOneUserQuery = async (where, scope) => {
    return await User.scope(scope).findOne({ where });
};
export const createUserQuery = async (user) => {
    const createdUser = await User.create(user);

    delete createdUser.dataValues.password;
    delete createdUser.dataValues.passwordHash;
    delete createdUser.dataValues.passwordSalt;

    return createdUser;
};
export const updateUserQuery = async (user, where) => {
    const updatedUser = await User.update(user, { where });
    return updatedUser;
};
export const deleteUserQuery = async (where) => {
    const deletedUser = await User.destroy({
        where,
    });
    return deletedUser;
};
