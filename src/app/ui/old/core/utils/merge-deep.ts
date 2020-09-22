/* eslint-disable */
const isObject = item => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

export const mergeDeep = (target, ...sources) => {
  if (!sources.length) {
    return target;
  }

  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      // noinspection JSUnfilteredForInLoop
      if (isObject(source[key])) {
        // noinspection JSUnfilteredForInLoop
        if (!target[key]) {
          // noinspection JSUnfilteredForInLoop
          Object.assign(target, {[key]: {}});
        } else {
          // noinspection JSUnfilteredForInLoop
          target[key] = {...target[key]};
        }
        // noinspection JSUnfilteredForInLoop
        mergeDeep(target[key], source[key]);
      } else {
        // noinspection JSUnfilteredForInLoop
        Object.assign(target, {[key]: source[key]});
      }
    }
  }

  return mergeDeep(target, ...sources);
};
