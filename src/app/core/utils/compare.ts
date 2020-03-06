export const compareById = (c1: {id: number}, c2: {id: number}): boolean => {
  return c1 && c2 ? c1.id === c2.id : c1 === c2;
};
