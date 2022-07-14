import { Strategy as LocalStrategy } from "passport-local";
import { passwordMatch } from "../../lib/passwordUtils.js";
import { User } from "../../models/index.js";

const customFields = {
    usernameField: "email",
    passwordField: "password",
};

const verifyCallback = async (email, password, done) => {
    try {
        const user = await User.findOne({
            where: {
                email,
            },
        });
        if (!user) {
            return done(null, false, {
                message: "Incorrect email or password.",
            });
        }
        const isValid = passwordMatch(
            password,
            user.passwordHash,
            user.passwordSalt
        );
        if (!isValid) {
            return done(null, false, {
                message: "Incorrect email or password.",
            });
        }
        return done(null, user);
    } catch (error) {
        done(error);
    }
};

const localStrategy = new LocalStrategy(customFields, verifyCallback);

export { localStrategy };
