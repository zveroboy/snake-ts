import { createMachine, interpret } from 'xstate'

export const gameMachine = createMachine({
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
        PAUSE: { target: 'paused' },
        GAME_OVER: { target: 'over.loose' },
        WIN: { target: 'over.win' },
      },
    },
    paused: {
      on: {
        RESUME: { target: 'playing' },
      },
    },
    over: {
      states: {
        win: {
          type: 'final',
        },
        loose: {
          type: 'final',
        },
      },
    },
  },
})

export const gameService = interpret(gameMachine).onTransition((state) => {
  console.log(state.value)
})
