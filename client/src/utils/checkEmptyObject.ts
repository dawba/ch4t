export const checkEmptyObject = (obj: object | null) => {
  return obj === null || Object.keys(obj).length === 0;
};
