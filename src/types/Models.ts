export interface StorageBoardModel {
  score?: number;
  board?: number[];
}

export interface StoragePlayerModel {
  nickname?: string;
  bestScore?: number;
}

export interface Point {
  x: number;
  y: number;
}
