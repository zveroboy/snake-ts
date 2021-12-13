import { Coords } from '../utils/matrix'

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export const DIRECTIONS: Record<Direction, Coords> = Object.freeze({
  [Direction.UP]: [-1, 0],
  [Direction.DOWN]: [1, 0],
  [Direction.LEFT]: [0, -1],
  [Direction.RIGHT]: [0, 1],
})
