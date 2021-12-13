import sample from 'lodash/sample'
import { FieldType } from '../../types/game'
import { Coords, Matrix } from '../../utils/matrix'
import { Snake } from './Snake'
import { Board } from './Board'
import { Direction } from '../../const/direction'

export class Stage {
  public food: Coords
  constructor(readonly board: Board, readonly snake: Snake, food?: Coords) {
    this.food = food ?? this.generateFoodCoords()
  }

  generateFoodCoords(): Coords {
    const tempBoard = this.board.clone()
    for (const [y, x] of this.snake) {
      tempBoard.matrix[y][x] = FieldType.SNAKE
    }

    // const coords = [...tempBoard.traverse(([y,x], matrix)=> {
    //   return [[y,x] as Coords, matrix[y][x]]
    // })].filter(())
    const coords = tempBoard.matrix.flatMap((row, y) =>
      row.reduce<Coords[]>((acc, val, x) => {
        if (val === FieldType.EMPTY) acc.push([y, x])
        return acc
      }, []),
    )

    const result = sample(coords)

    if (!result) throw new Error('Failed on random element retrieving')

    return result
  }

  snakeEats(direction: Direction): Stage {
    return new Stage(this.board, this.snake.eat(direction))
  }

  snakeMoves(direction: Direction): Stage {
    return new Stage(this.board, this.snake.move(direction), this.food)
  }

  outputMatrix(): Matrix<FieldType> {
    const { matrix } = this.board.clone()

    // console.log('this.snake', [...this.snake])
    for (const coords of this.snake) {
      matrix[coords[0]][coords[1]] = FieldType.SNAKE
    }

    {
      const [y, x] = this.food
      matrix[y][x] = FieldType.FOOD
    }

    return matrix
  }
}
