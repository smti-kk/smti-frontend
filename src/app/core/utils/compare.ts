import { Location } from '@core/models';
import { AutocompleteOptionGroups } from '@shared/layout/nz-autocomplete/grouped-autocomplete.component';

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

export const locationsToOptionsGroup = (locations: Location[]): AutocompleteOptionGroups[] => {
  return groupBy(locations, (l) => l.municipalityArea, l => l).map(group => {
    return {
      title: group.field,
      children: group.value.map(location => {
        return {
          title: location.fullName,
        };
      }),
    };
  });
};
