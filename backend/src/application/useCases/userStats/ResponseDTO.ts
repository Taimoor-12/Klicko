class ResponseDTO {
  totalClicks: number;
  totalLinks: number;
  topLink: string;

  constructor({
    totalClicks,
    totalLinks,
    topLink,
  }: {
    totalClicks: number;
    totalLinks: number;
    topLink: string;
  }) {
    this.totalClicks = totalClicks;
    this.totalLinks = totalLinks;
    this.topLink = topLink;
  }
}

export default ResponseDTO;
