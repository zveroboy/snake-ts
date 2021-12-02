import { FC, forwardRef } from 'react'
import { BOARD_SIZE } from '../../const/board'

const usize = 12

const width = usize * BOARD_SIZE.w
const height = usize * BOARD_SIZE.h

const Stage = forwardRef<HTMLCanvasElement>((_, ref) => {
  return (
    <div className="flex place-content-center rounded shadow-xl border-4 border-gray-200">
      <canvas
        ref={ref}
        width={width}
        height={height}
        style={{
          width: `${width * 2}px`,
          height: `${height * 2}px`,
        }}
      ></canvas>
    </div>
  )
})

export default Stage
