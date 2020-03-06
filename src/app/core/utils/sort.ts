interface HasId {
  id: number;
}

export const popToTop = <T extends HasId>(array: T[], item: T): T[] => {
  const iArray = array.filter(i => i.id !== item.id);
  iArray.unshift(item);
  return iArray;
};
