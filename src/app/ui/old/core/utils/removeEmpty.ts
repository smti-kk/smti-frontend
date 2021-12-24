export function removeEmpty(obj) {
  Object.keys(obj).forEach(
    (k) => (obj[k] == null || obj[k]?.length == 0) && delete obj[k]
  );
  return obj;
}
