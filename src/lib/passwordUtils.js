import crypto from "crypto";

/**
 * @param {string} password
 * @returns {string}
 * @description Generates a salt and hash from a password using pbkdf2 algorithm and sha512 algorithm as the hash algorithm and 1000 iterations as the iteration count and 64 bytes as the key length and digest as the digest encoding format (hex) as the output format of the hash function and the callback function
 */
const genPassword = (password) => {
    const salt = crypto.randomBytes(32).toString("hex");
    const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");
    return {
        salt,
        hash,
    };
};

/**
 * @param {string} password
 * @param {string} salt
 * @returns {string}
 * @description Check if the password is match with the hash and salt
 */
const passwordMatch = (password, hash, salt) => {
    const hashVerify = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");
    return hash === hashVerify;
};

export { genPassword, passwordMatch };
