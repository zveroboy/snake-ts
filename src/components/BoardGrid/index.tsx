import { FC, memo, CSSProperties, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './BoardGrid.module.css'

interface Props {
  className?: string
  width: number
  height: number
}

const BoardGrid: FC<Props> = ({ children, className, width, height }) => {
  return (
    <div
      className={cn(
        'grid',
        'place-content-center',
        'gap-px',
        className,
        styles.container,
      )}
      style={
        {
          '--rows': height,
          '--cols': width,
        } as CSSProperties
      }
    >
      {children}
    </div>
  )
}

export default memo<PropsWithChildren<Props>>(BoardGrid)
