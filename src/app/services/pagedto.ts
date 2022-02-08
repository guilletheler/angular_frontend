export class PageDto<T> {
  first: number = -1;
  rows: number = -1;
  totalElements: number = -1;
  elements: T[] = [];
}
