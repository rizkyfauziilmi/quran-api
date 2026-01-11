export class ApiResponse<T> {
  status?: 'success' | 'error';
  message?: string;
  query?: Record<string, any>;
  data: T;

  constructor(options: {
    status?: 'success' | 'error';
    message?: string;
    query?: Record<string, any>;
    data: T;
  }) {
    this.status = options.status ?? 'success';
    this.message = options.message ?? 'success';
    // only show query params if they exist
    if (options.query && Object.keys(options.query).length > 0) {
      this.query = options.query;
    }
    this.data = options.data;
  }
}
