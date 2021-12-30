import { createMachine, assign, send, Receiver } from 'xstate'
import { Direction, DIRECTIONS } from '../../const/direction'
import { BOARD_SIZE } from '../../const/game'
import { add, compare, checkIsOutOfBounds, Coords } from '../../utils/matrix'
import { Board } from './Board'
import {
  checkIsMoveEvent,
  GameCallbackEvent,
  GameContext,
  GameEvent,
} from './context'
import { Snake } from './Snake'
import { Stage } from './Stage'

// class ContreteGameContext implements GameContext {
//   stage!: Stage
//   direction!: Direction
//   interval!: number
//   constructor(context: GameContext) {
//     Object.assign(this, context)
//   }
//   get score(): number {
//     return this.stage.snake.size
//   }
// }

const createContext = (
  baseContext: Omit<GameContext, 'computed'>,
): GameContext => {
  return Object.assign(baseContext, {
    computed: {
      get score() {
        return baseContext.stage.snake.size
      },
    },
  })
}

const eat = (context: GameContext, direction: Direction): GameContext => {
  const newStage = context.stage.snakeEats(direction)
  return createContext({
    stage: newStage,
    direction,
    interval: 1000 - Math.sqrt(newStage.snake.size) * 100,
  })
}

const move = (context: GameContext, direction: Direction): GameContext => {
  return createContext({
    ...context,
    stage: context.stage.snakeMoves(direction),
    direction,
  })
}

const validateNewCoords = (
  { stage: { snake, board } }: GameContext,
  direction: Direction,
): boolean => {
  const newCoords = snake.calcNextMoveCoords(direction)
  return (
    !checkIsOutOfBounds(board.width, board.height, newCoords) &&
    !snake.checkCollision(direction)
  )
}

const getDireaction = (context: GameContext, event: GameEvent) =>
  checkIsMoveEvent(event) ? event.payload : context.direction

export const createInitialGameContext = (): GameContext => {
  const board = new Board(BOARD_SIZE.W, BOARD_SIZE.H)
  const snake = new Snake([[0, 0]])
  const stage = new Stage(board, snake)
  return createContext({
    stage,
    direction: Direction.RIGHT,
    interval: 1000,
  })
}

export const gameMachine = createMachine<GameContext, GameEvent>({
  id: 'game',
  initial: 'idle',
  states: {
    idle: {
      on: {
        START: { target: 'playing' },
      },
    },
    playing: {
      on: {
        MOVE: [
          {
            target: undefined,
            cond: 'isOpposite',
          },
          {
            target: 'over',
            cond: 'isMoveInvalid',
          },
          {
            target: undefined,
            cond: 'isFoodReached',
            actions: ['eat', 'sendResetTimer'],
          },
          {
            target: undefined,
            actions: ['move', 'sendResetTimer'],
          },
        ],
        AUTO_MOVE: [
          {
            target: 'over',
            cond: 'isMoveInvalid',
          },
          {
            target: undefined,
            cond: 'isFoodReached',
            actions: ['eat', 'sendResetTimer'],
          },
          {
            target: undefined,
            actions: ['move', 'sendResetTimer'],
          },
        ],
        PAUSE: { target: 'paused' },
      },
      invoke: {
        id: 'ticker',
        src: 'ticker',
      },
    },
    paused: {
      on: {
        RESUME: { target: 'playing' },
      },
    },
    over: {
      on: {
        RESET: { target: 'idle', actions: ['playAgain'] },
      },
    },
  },
})
  .withConfig({
    services: {
      ticker:
        (context) => (callback, onReceive: Receiver<GameCallbackEvent>) => {
          let interval: number | undefined
          const createInterval = (time: number) => {
            interval = setInterval(() => {
              callback({ type: 'AUTO_MOVE' })
            }, time)
          }

          createInterval(context.interval)

          onReceive((ev) => {
            if (ev.type === 'RESET_TIMER') {
              clearInterval(interval)
              createInterval(ev.payload)
            }
          })

          return () => {
            clearInterval(interval)
          }
        },
    },
    guards: {
      isOpposite: ({ direction }, event) => {
        if (!checkIsMoveEvent(event)) return true
        const res = compare(
          [0, 0],
          add(DIRECTIONS[direction], DIRECTIONS[event.payload]),
        )
        return res
      },
      isMoveInvalid: (context, event) => {
        return !validateNewCoords(context, getDireaction(context, event))
      },
      isFoodReached: (context, event) => {
        const { stage } = context
        const direction = getDireaction(context, event)
        const newCoords = stage.snake.calcNextMoveCoords(direction)
        return compare(stage.food, newCoords)
      },
    },
    actions: {
      playAgain: assign(createInitialGameContext),
      eat: assign((context, event): GameContext => {
        return eat(context, getDireaction(context, event))
      }),
      move: assign((context, event): GameContext => {
        return move(context, getDireaction(context, event))
      }),
      sendResetTimer: send(
        (context) => ({ type: 'RESET_TIMER', payload: context.interval }),
        { to: 'ticker' },
      ),
    },
  })
  .withContext(createInitialGameContext())
