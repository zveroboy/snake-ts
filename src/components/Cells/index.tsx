import { ComponentType, FC } from 'react'
import cn from 'classnames'
import { ClassName } from '../../types/ClassName'
import { FieldType } from '../../types/game'
import styles from './Cell.module.css'

// const useGame = (): React.RefObject<HTMLCanvasElement> => {
//   // const canvasRef = useRef<HTMLCanvasElement>(null)
//   // const nextState = gameMachine.transition(gameMachine.initialState, {
//   //   type: 'START',
//   // })
//   // console.log(nextState)
//   // const service = useMemo(
//   //   () => canvasRef.current && new BaseGameService(canvasRef.current),
//   //   [canvasRef.current],
//   // )
//   useEffect(() => {
//     gameService.start()
//     return () => {
//       gameService.stop()
//     }
//   }, [])
//   return canvasRef
// }

const BaseCell: FC<ClassName> = ({ className }) => (
  <div className={cn('w-6', 'h-6', className)} />
)

const Cells: Record<FieldType, ComponentType> = {
  [FieldType.EMPTY]: () => <BaseCell className="relative bg-gray-200 z-0" />,
  [FieldType.SNAKE]: () => (
    <div>
      <BaseCell className="absolute z-10 shadow-lg shadow-green-900" />
      <BaseCell className="relative z-20 bg-green-500" />
    </div>
  ),
  [FieldType.FOOD]: () => (
    <BaseCell className="relative bg-red-500 shadow-lg shadow-red-900 z-10" />
  ),
}

export default Cells
