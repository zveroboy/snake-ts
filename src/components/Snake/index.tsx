import { FC } from 'react'
import identity from 'lodash/identity'
import { Matrix } from '../../utils/matrix'
import { FieldType } from '../../types/game'
import Cells from '../Cells'

interface Props {
  matrix: Matrix<FieldType>
}

const Snake: FC<Props> = ({ matrix }) => {
  return (
    <>
      {matrix
        .flatMap((rows) => rows.map<FieldType>(identity))
        .map((val, i) => {
          const Cell = Cells[val]
          return <Cell key={i} />
        })}
    </>
  )
}

export default Snake
