import sequelize from "../db/sequelize.js";

const querySQLFile = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, "utf8", (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

const runSQLFile = (fileName) => {
    return new Promise((resolve, reject) => {
        querySQLFile(fileName)
            .then((data) => {
                sequelize
                    .query(data)
                    .then((result) => {
                        resolve(result);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export { querySQLFile, runSQLFile };
