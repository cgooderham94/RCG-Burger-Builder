export const updateObj = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    }
};