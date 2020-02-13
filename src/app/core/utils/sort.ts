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

interface HasId {
  id: number;
}

export const popToTop = <T extends HasId>(array: T[], item: T) => {
  array = array.filter(i => i.id !== item.id);
  array.unshift(item);
  return array;
};
