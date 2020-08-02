export const sortStringDescCompareFn = (field) => {
  return (a, b) => {
    if (a[field] < b[field]) {
      return 1;
    } else {
      return -1;
    }
  };
};

export const sortStringAscCompareFn = (field) => {
  return (a, b) => {
    if (a[field] > b[field]) {
      return 1;
    } else {
      return -1;
    }
  };
};

export const sortStringDescCompareFn2 = (field, field2) => {
  return (a, b) => {
    if (a[field][field2] < b[field][field2]) {
      return 1;
    } else {
      return -1;
    }
  };
};

export const sortStringAscCompareFn2 = (field, field2) => {
  return (a, b) => {
    if (a[field][field2] > b[field][field2]) {
      return 1;
    } else {
      return -1;
    }
  };
};
