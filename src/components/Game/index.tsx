import React, { useEffect, useMemo, useRef } from 'react'
import { gameMachine, gameService } from '../../machines/game'
import Stage from '../Stage'

const useGame = (): React.RefObject<HTMLCanvasElement> => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // const nextState = gameMachine.transition(gameMachine.initialState, {
  //   type: 'START',
  // })
  // console.log(nextState)

  // const service = useMemo(
  //   () => canvasRef.current && new BaseGameService(canvasRef.current),
  //   [canvasRef.current],
  // )

  useEffect(() => {
    gameService.start()
    return () => {
      gameService.stop()
    }
  }, [])

  return canvasRef
}

const Game = () => {
  const canvasRef = useGame()

  return (
    <div className="h-screen flex place-content-center items-center">
      <Stage ref={canvasRef} />
      {/* <div><button onClick={}>Pause</button></div> */}
    </div>
  )
}

export default Game
