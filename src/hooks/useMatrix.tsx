import { useMemo } from 'react'
import { Matrix, createMatrix } from '../utils/matrix'

export const useMatrix = (width: number, height: number): Matrix<number> => {
  return useMemo(
    () => createMatrix({ width, height, value: 0 }),
    [width, height],
  )
}
