import { FieldType } from '../../types/game'
import {
  Coords,
  createMatrix,
  Matrix,
  traverseMatrix,
} from '../../utils/matrix'

export class Board {
  public matrix: Matrix<FieldType>
  constructor(public width: number, public height: number) {
    this.matrix = createMatrix({ width, height, value: FieldType.EMPTY })
  }

  clone(): Board {
    return new Board(this.width, this.height)
  }

  setValue([y, x]: Coords, value: FieldType) {
    this.matrix[y][x] = value
  }

  *traverse<T>(
    fn: (coords: Coords, matrix: Matrix<FieldType>) => T,
  ): Iterable<T> {
    yield* traverseMatrix<T, FieldType>(this.matrix)((coords: Coords) =>
      fn(coords, this.matrix),
    )
  }
}
