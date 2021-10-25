export const removeEmptyStringsFrom = (
  obj: {[key: string]: string},
  extraParam?: string | string[]
) =>
  Object.entries({...obj})
    .filter(([key, val]) => {
      if (val === '') {
        return false;
      }

      if (extraParam) {
        return extraParam instanceof Array ? !extraParam.includes(val) : val !== extraParam;
      }
    })
    .reduce((prev, curr) => ({...prev, [curr[0]]: curr[1]}), {});
