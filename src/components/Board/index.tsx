import { FC, ComponentType, memo } from 'react'
import identity from 'lodash/identity'
import { useMatrix } from '../../hooks/useMatrix'

interface Props {
  Cell: ComponentType
  width: number
  height: number
}

const Board: FC<Props> = ({ Cell, width, height }) => {
  const matrix = useMatrix(width, height)

  return (
    <>
      {matrix
        .flatMap((rows) => rows.map(identity))
        .map((_, i) => (
          <Cell key={i} />
        ))}
    </>
  )
}

export default memo(Board)
