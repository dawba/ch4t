const isObjectEmpty = (objectName: any) => {
  return (
    objectName &&
    JSON.stringify(objectName) === '{}' &&
    objectName.constructor === Object
  );
};
