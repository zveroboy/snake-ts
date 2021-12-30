import { FC, useMemo, useEffect, useCallback } from 'react'
import { useMachine } from '@xstate/react'
import cn from 'classnames'
import BoardGrid from '../BoardGrid'
import { gameMachine } from '../../machines/game'
import { Direction } from '../../const/direction'
import Snake from '../Snake'
import { getSize } from '../../utils/matrix'
import styles from './Game.module.css'
import Button from '../Button'
import GameOverDialog from '../GameOverDialog'
import Board from '../Board'
import { MoveEvent } from '../../machines/game/context'

const KEY_MAP: Record<string, Direction> = {
  ArrowLeft: Direction.LEFT,
  ArrowRight: Direction.RIGHT,
  ArrowUp: Direction.UP,
  ArrowDown: Direction.DOWN,
}

const useKeydownHandler = (keydownHandler: (e: KeyboardEvent) => void) => {
  useEffect(() => {
    window.addEventListener('keydown', keydownHandler)
    return () => {
      window.removeEventListener('keydown', keydownHandler)
    }
  }, [keydownHandler])
}

const useKeydownEvents = (send: (event: MoveEvent) => void) => {
  const keydownHandler = useCallback(
    (e: KeyboardEvent) => {
      const payload = KEY_MAP[e.key]
      if (payload == null) return
      send({ type: 'MOVE', payload })
    },
    [send],
  )

  useKeydownHandler(keydownHandler)
}

const Container: FC = ({ children }) => (
  <div
    className={cn(
      'h-screen',
      'flex',
      'justify-center',
      'items-center',
      'bg-gray-600',
    )}
  >
    {children}
  </div>
)

const Stage: FC = ({ children }) => (
  <div
    className={cn(
      'flex',
      'flex-col',
      'justify-center',
      'items-center',
      'gap-4',
    )}
  >
    {children}
  </div>
)

const Name: FC = ({ children }) => (
  <div
    className={cn(
      'font-mono',
      'text-lg',
      'tracking-widest',
      'lowercase',
      'text-amber-500',
      styles.name,
    )}
  >
    {children}
  </div>
)

const Score: FC = ({ children }) => (
  <div
    className={cn(
      'font-mono',
      'text-sm',
      'lowercase',
      'text-gray-100',
      styles.score,
    )}
  >
    {children}
  </div>
)

const Game: FC = () => {
  const [state, send] = useMachine(gameMachine)

  // const matrix = useMemo(() => state.context.stage.outputMatrix(), [state])
  const matrix = state.context.stage.outputMatrix()

  useKeydownEvents(send)

  const [w, h] = getSize(matrix)

  const handleDialogClose = useCallback(() => send({ type: 'RESET' }), [send])

  return (
    <>
      <Container>
        <Stage>
          <div className={cn(styles.stageWrapper)}>
            <Name>Snake</Name>
            <Score>Score: {state.context.computed.score}</Score>
            <Board>
              <BoardGrid className="shadow-xl" width={w} height={h}>
                <Snake matrix={matrix} />
              </BoardGrid>
            </Board>
          </div>

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
            {state.matches('over') && <Button>Play</Button>}
          </div>
        </Stage>
      </Container>

      <GameOverDialog
        isOpen={state.matches('over')}
        onChangeOpen={handleDialogClose}
      />
    </>
  )
}

export default Game
