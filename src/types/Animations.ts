import { Directions } from './Directions';

export enum AnimationType {
  NEW,
  MERGE,
  MOVE,
}

export interface AnimationModel {
  type: AnimationType;
  index: number;
}

export interface AnimationNew extends AnimationModel {
  type: AnimationType.NEW;
  index: number;
}

export interface AnimationMerge extends AnimationModel {
  type: AnimationType.MERGE;
  index: number;
}

export interface AnimationMove extends AnimationModel {
  type: AnimationType.MOVE;
  index: number;
  direction: Directions;
  value: number;
}

export type Animation = AnimationNew | AnimationMerge | AnimationMove;
