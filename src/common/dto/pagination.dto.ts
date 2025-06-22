export interface PaginationDto {
  currentPage: number;
  nextPage: number;
  previousPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
  totalItems: number;
}
