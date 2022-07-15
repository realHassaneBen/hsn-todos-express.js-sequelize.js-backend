import UserSensitiveData from "../constants/SensitiveData.js";
import { User } from "../scopes/index.js";

const findAllUsersQuery = async (scope) => {
    return await User.scope(scope).findAll();
};

const findByPkUserQuery = async (id, scope) => {
    return await User.scope(scope).findByPk(id);
};

const findOneUserQuery = async (where, scope) => {
    return await User.scope(scope).findOne({ where });
};

const createUserQuery = async (user) => {
    const createdUser = await User.create(user);

    delete createdUser.dataValues.password;
    delete createdUser.dataValues.passwordHash;
    delete createdUser.dataValues.passwordSalt;

    return createdUser;
};

const updateUserQuery = async (user, where) => {
    const updatedUser = await User.update(user, { where });
    return updatedUser;
};

const deleteUserQuery = async (where) => {
    const deletedUser = await User.destroy({
        where,
    });
    return deletedUser;
};

export {
    findAllUsersQuery,
    findByPkUserQuery,
    findOneUserQuery,
    createUserQuery,
    updateUserQuery,
    deleteUserQuery,
};
