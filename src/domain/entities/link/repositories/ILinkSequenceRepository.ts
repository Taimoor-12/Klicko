export interface ILinkSequenceRepository {
  getNextSequenceNumber(): Promise<bigint>;
}

