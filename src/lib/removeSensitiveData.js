import SensitiveData from "../constants/SensitiveData.js";
import { removeFieldFromObject } from "./filterData.js";

export const removeUserSensitiveData = (user) => {
    if (typeof user === "object") {
        for (let index = 0; index < SensitiveData.length; index++) {
            const sd = SensitiveData[index];
            removeFieldFromObject(user, sd);
        }
    } else if (typeof user === "array") {
        user.forEach(removeUserSensitiveData);
    }
};
