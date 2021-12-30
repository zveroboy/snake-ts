import { Direction } from '../../const/direction'
import { Matrix } from '../../utils/matrix'
import { Stage } from './Stage'

export type MoveEvent = { type: 'MOVE'; payload: Direction }
export type AutoMoveEvent = { type: 'AUTO_MOVE' }

export type GameEvent =
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'RESET' }
  | MoveEvent
  | AutoMoveEvent

export type GameCallbackEvent = {
  type: 'RESET_TIMER'
  payload: number
}

export interface GameContext {
  stage: Stage
  direction: Direction
  interval: number
  computed: {
    score: number
  }
}

export const checkIsMoveEvent = (event: GameEvent): event is MoveEvent =>
  event.type === 'MOVE'

export const checkIsAutoMoveEvent = (event: GameEvent): event is MoveEvent =>
  event.type === 'AUTO_MOVE'

export const assertIsMoveEvent: (
  event: GameEvent,
) => asserts event is MoveEvent = (event) => {
  if (!checkIsMoveEvent(event)) throw new Error('WRONG_EVENT_TYPE')
}
