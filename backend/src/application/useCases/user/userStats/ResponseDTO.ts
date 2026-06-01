class ResponseDTO {
  totalClicks: number;
  totalLinks: number;
  topLink: string | null;

  constructor({
    totalClicks,
    totalLinks,
    topLink,
  }: {
    totalClicks: number;
    totalLinks: number;
    topLink: string | null;
  }) {
    this.totalClicks = totalClicks;
    this.totalLinks = totalLinks;
    this.topLink = topLink;
  }
}

export default ResponseDTO;
