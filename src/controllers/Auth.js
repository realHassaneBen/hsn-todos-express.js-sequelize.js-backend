import { createUser } from "./User.js";
import passport from "passport";
import { validateRegister } from "../validation/Auth.js";
import { registerUserQuery } from "../queries/auth.js";
import { genPassword } from "../lib/passwordUtils.js";
import { findByPkUserQuery, findOneUserQuery } from "../queries/users.js";

const login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err)
            return res.status(500).json({
                message: err.message,
            });

        if (!user)
            return res.status(401).json({
                isAuthenticated: req.isAuthenticated(),
                message: info.message,
            });

        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({
                    isAuthenticated: req.isAuthenticated(),
                    message: err.message,
                });
            }

            return res.status(200).json({
                isAuthenticated: req.isAuthenticated(),
                message: "Login successful",
            });
        });
    })(req, res, next);
};

const register = async (req, res, next) => {
    const { firstName, lastName, username, email, password } = req.body;

    const userData = {
        firstName,
        lastName,
        username,
        email,
        password,
    };

    const hashedPassword = genPassword(userData.password);
    userData.passwordHash = hashedPassword.hash;
    userData.passwordSalt = hashedPassword.salt;

    const isRegisterValid = validateRegister(userData);

    if (!isRegisterValid.valid) {
        return res.status(401).json({
            valid: isRegisterValid.valid,
            errors: isRegisterValid.errors,
        });
    }

    const user = await registerUserQuery(userData);

    if (user) {
        res.status(201).json({
            message: `User created with ID: ${user.id}`,
            user,
        });
    } else {
        res.status(500).json({
            message: `Faile to create a user`,
        });
    }
};

const profile = async (req, res, next) => {
    const { session, user } = req;
    const profile = await findByPkUserQuery(user.id, [
        "withoutPassword",
        "withAssociations",
    ]);
    delete user.dataValues.passwordHash;
    delete user.dataValues.passwordSalt;

    return res.status(200).json({
        isAuthenticated: req.isAuthenticated(),
        user: profile,
        message: "Profile retrieved successfully",
    });
};

const logout = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({
                message: err.message,
            });

            // next(err);
        }

        // res.setHeader(
        //     "set-cookie",
        //     "connect.sid=xd; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
        // );
        return next();
    });
};

const logoutSession = async (req, res, next) => {
    return req.session.destroy(function (err) {
        if (err) {
            return res.status(500).json({
                message: err.message,
            });

            // next(err);
        }

        res.status(200).clearCookie("connect.sid", { path: "/" }).json({
            status: "success",
            message: "Logged out successfully",
        });
    });
};

export { login, register, profile, logout, logoutSession };
