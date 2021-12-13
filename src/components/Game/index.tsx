import { useMemo, useEffect, FC, HTMLProps } from 'react'
import { useMachine } from '@xstate/react'
import StageGrid from '../StageGrid'
import { createInitialGameContext, gameMachine } from '../../machines/game'
import { Direction } from '../../const/direction'
import Snake from '../Snake'
import { getSize } from '../../utils/matrix'

const Button: FC<HTMLProps<HTMLButtonElement>> = ({
  children,
  type,
  ...props
}) => (
  <button
    className="py-2 px-3 bg-indigo-500 text-white text-sm font-semibold rounded-md shadow-lg shadow-indigo-500/50 focus:outline-none"
    {...props}
  >
    {children}
  </button>
)

const Game = () => {
  const dynamicMachine = useMemo(
    () => gameMachine.withContext(createInitialGameContext()),
    [],
  )

  const [state, send] = useMachine(dynamicMachine)

  const matrix = useMemo(() => state.context.stage.outputMatrix(), [state])

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          send({ type: 'MOVE', payload: Direction.LEFT })
          break
        case 'ArrowRight':
          send({ type: 'MOVE', payload: Direction.RIGHT })
          break
        case 'ArrowUp':
          send({ type: 'MOVE', payload: Direction.UP })
          break
        case 'ArrowDown':
          send({ type: 'MOVE', payload: Direction.DOWN })
          break
      }
    }

    window.addEventListener('keydown', keydownHandler)

    return () => {
      window.removeEventListener('keydown', keydownHandler)
    }
  }, [])

  const [w, h] = getSize(matrix)

  return (
    <div className="h-screen flex flex-col place-content-center items-center gap-4">
      {/* <StageGrid
        className="shadow-xl"
      >
      </StageGrid>
      */}
      <StageGrid className="shadow-xl" width={w} height={h}>
        <Snake matrix={matrix} />
      </StageGrid>
      <div>
        {state.matches('idle') && (
          <Button onClick={() => send({ type: 'START' })}>Play</Button>
        )}
        {state.matches('playing') && (
          <Button onClick={() => send({ type: 'PAUSE' })}>Pause</Button>
        )}
        {state.matches('paused') && (
          <Button onClick={() => send({ type: 'RESUME' })}>Resume</Button>
        )}
        {state.matches('over') && (
          <Button onClick={() => send({ type: 'PLAY_AGAIN' })}>
            Play again
          </Button>
        )}
      </div>
    </div>
  )
}

export default Game
