// This function removes field data from the object.
export const removeFieldFromObject = (obj, field) => {
    if (obj.hasOwnProperty(field)) {
        delete obj[field];
    }
    return obj;
};

// Remove field data from an array of objects.
export const removeFieldFromArray = (arr, field) => {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].hasOwnProperty(field)) {
            delete arr[i][field];
        }
    }
};
