export interface TableOptions {
  columns: Array<JSX.Element>;
  rows: Array<JSX.Element>;
  page?: number;
  lastPage?: number;
  onPageChange?: any;
  title?: string;
}
