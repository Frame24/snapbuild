import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'md' | 'lg'

type CommonProps = {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    href?: undefined
  }

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'> & {
    href: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink

function buttonClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
) {
  return [
    styles.button,
    styles[variant],
    size === 'lg' ? styles.lg : styles.md,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')
}

export function Button(props: ButtonProps) {
  const {
    children,
    variant = 'secondary',
    size = 'lg',
    className,
    ...rest
  } = props

  const classes = buttonClassName(variant, size, className)

  if ('href' in props && props.href) {
    const linkProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a className={classes} {...linkProps}>
        <span className={styles.label}>{children}</span>
      </a>
    )
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type="button" className={classes} {...buttonProps}>
      <span className={styles.label}>{children}</span>
    </button>
  )
}
