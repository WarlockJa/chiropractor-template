// this function deeply compares two objects, including nested objects
// returns true if objects are deeply equal, otherwise false.

export default function isDeepEqual(object1: any, object2: any) {
  if (object1 === undefined || object1 === null) {
    return object1 === object2;
  }

  const objKeys1 = Object.keys(object1);
  const objKeys2 = Object.keys(object2);

  if (objKeys1.length !== objKeys2.length) return false;

  for (var key of objKeys1) {
    const value1 = object1[key];
    const value2 = object2[key];

    const isObjects =
      value1 !== null &&
      typeof value1 === "object" &&
      value2 !== null &&
      typeof value2 === "object";

    if (
      (isObjects && !isDeepEqual(value1, value2)) ||
      (!isObjects && value1 !== value2)
    ) {
      return false;
    }
  }
  return true;
}
