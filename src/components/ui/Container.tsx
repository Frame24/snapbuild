import type { ElementType, ReactNode } from 'react'
import styles from './Container.module.css'

type ContainerProps = {
  as?: ElementType
  children: ReactNode
  className?: string
  narrow?: boolean
}

export function Container({
  as: Tag = 'div',
  children,
  className,
  narrow = false,
}: ContainerProps) {
  const classNames = [
    styles.container,
    narrow ? styles.narrow : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return <Tag className={classNames}>{children}</Tag>
}
