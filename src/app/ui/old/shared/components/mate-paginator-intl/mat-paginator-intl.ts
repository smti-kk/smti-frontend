import { MatPaginatorIntl } from "@angular/material/paginator";

export function MatCustomPaginatorIntl() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'Количество строк на странице:';
  customPaginatorIntl.firstPageLabel ="Первая страница";
  customPaginatorIntl.lastPageLabel ="Последняя страница";
  customPaginatorIntl.nextPageLabel ="Следующая страница";
  customPaginatorIntl.previousPageLabel ="Предыдущая страница";

  customPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
    const of =  "из";
    if (length === 0 || pageSize === 0) {
      return `0 ${of} ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize > length ? (Math.ceil(length / pageSize) - 1) * pageSize : page * pageSize;

    const endIndex = Math.min(startIndex + pageSize, length);
    return `${startIndex + 1} - ${endIndex} ${of} ${length}`;
  };

  return customPaginatorIntl;
}
