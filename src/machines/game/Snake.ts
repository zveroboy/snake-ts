import { Direction, DIRECTIONS } from '../../const/direction'
import { add, compare, Coords } from '../../utils/matrix'

export class Snake {
  constructor(public body: Coords[]) {}

  get headCoords(): Coords {
    return this.body[this.body.length - 1]
  }

  get size(): number {
    return this.body.length - 1
  }

  eat(direction: Direction): Snake {
    const coords = this.calcNextMoveCoords(direction)
    return new Snake(this.body.concat([coords]))
  }

  move(direction: Direction): Snake {
    const coords = this.calcNextMoveCoords(direction)
    return new Snake(this.body.slice(1).concat([coords]))
  }

  checkCollision(direction: Direction): boolean {
    const coords = this.calcNextMoveCoords(direction)
    return this.body.slice(1).some((cur) => compare(cur, coords))
  }

  calcNextMoveCoords(direction: Direction): Coords {
    return add(this.headCoords, DIRECTIONS[direction])
  }

  *[Symbol.iterator]() {
    yield* this.body
  }
}
