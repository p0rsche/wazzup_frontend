export default interface Pagination {
  total?: number;
  lastPage?: number;
  currentPage: number;
  perPage: number;
  from: number;
  to: number;
}
