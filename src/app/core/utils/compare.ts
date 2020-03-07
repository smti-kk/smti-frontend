export const compareById = (c1: {id: number}, c2: {id: number}): boolean => {
  return c1 && c2 ? c1.id === c2.id : c1 === c2;
};

export interface GroupByResult<R, E> {
  field: R;
  value: E[];
}

export const groupBy = <T, R, E>(
  array: T[],
  getCompareField: (t: T) => R,
  getValue: (t: T) => E
): GroupByResult<R, E>[] => {
  const groupByResult: GroupByResult<R, E>[] = [];
  array.forEach(a => {
    const exist = groupByResult.find(item => item.field === getCompareField(a));
    if (exist) {
      exist.value.push(getValue(a));
    } else {
      groupByResult.push({
        field: getCompareField(a),
        value: [getValue(a)],
      });
    }
  });

  return groupByResult;
};
