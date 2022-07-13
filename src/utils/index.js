export const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const uppercaseFirst = (str) =>
    `${str[0].toUpperCase()}${str.substr(1)}`;
