export const sortStringDescCompareFn = field => {
  return (a, b) => {
    if (a[field] < b[field]) {
      return 1;
    } else {
      return -1;
    }
  };
};

export const sortStringAscCompareFn = field => {
  return (a, b) => {
    if (a[field] > b[field]) {
      return 1;
    } else {
      return -1;
    }
  };
};
