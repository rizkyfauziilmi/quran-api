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
    if (options.query) {
      this.query = options.query;
    }
    this.data = options.data;
  }
}
