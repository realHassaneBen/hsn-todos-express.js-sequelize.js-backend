import UserSensitiveData from "../constants/SensitiveData.js";
import { User } from "../scopes/index.js";

const findAllUsersQuery = async (withoutPassword = true) => {
    return withoutPassword
        ? await User.scope(["withoutPassword", "withAssociations"]).findAll()
        : await User.scope(["withAssociations"]).findAll();
};

const findByPkUserQuery = async (id) => {
    const user = await User.findByPk(id);
    return user;
};

const findOneUserQuery = async (where, withoutPassword = true) => {
    return withoutPassword
        ? await User.scope(["withoutPassword", "withAssociations"]).findOne({
              where,
          })
        : await User.scope(["withAssociations"]).findOne({ where });
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
