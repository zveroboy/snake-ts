export type Coords = [row: number, col: number]
export type Matrix<T> = T[][]

export const getSize = <T>(mat: Matrix<T>): [height: number, width: number] => {
  return [mat.length, mat[0]?.length ?? 0]
}

export const createMatrix = <T>({
  width,
  height,
  value,
}: {
  width: number
  height: number
  value: T
}) =>
  Array(height)
    .fill([])
    .map(() => Array(width).fill(value))

export const traverseMatrix = <R, T>(mat: T[][]) =>
  function* (fn: (coords: Coords) => R): Iterable<R> {
    const [h, w] = getSize(mat)
    for (let row = 0; row < h; row++) {
      for (let cell = 0; cell < w; cell++) {
        yield fn([row, cell])
      }
    }
  }

export const checkIsOutOfBounds = (
  width: number,
  height: number,
  [row, cell]: Coords,
): boolean => {
  return row < 0 || cell < 0 || row >= height || cell >= width
}

export const add = (coordsA: Coords, coordsB: Coords): Coords => {
  return [coordsA[0] + coordsB[0], coordsA[1] + coordsB[1]]
}
export const compare = (coordsA: Coords, coordsB: Coords): boolean => {
  return coordsA[0] === coordsB[0] && coordsA[1] === coordsB[1]
}
