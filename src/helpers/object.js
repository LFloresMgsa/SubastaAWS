export function checkIfObjectHasChanges(obj1, obj2) {
  if (!_.isEqual(obj1, obj2)) {
    return true;
  }
  return false;
}
