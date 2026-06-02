class RequestDTO {
  userId: string;
  page: number;
  limit: number;

  constructor({
    userId,
    page,
    limit
  }: {
    userId: string;
    page: number;
    limit: number;
  }) {
    this.userId = userId;
    this.page = page;
    this.limit = limit;
  }
}

export default RequestDTO;
