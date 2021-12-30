import { FC } from 'react'
import cn from 'classnames'
import styles from './Board.module.css'

interface Props {}

const Board: FC<Props> = ({ children }) => (
  <div className={cn(styles.corner, styles.glow)}>
    <div className={cn('bg-gray-600', styles.solid)}>
      <div className={cn('p-2', 'stripes', styles.corner)}>{children}</div>
    </div>
  </div>
)

export default Board
