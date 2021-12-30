import { FC, HTMLProps } from 'react'

const Button: FC<HTMLProps<HTMLButtonElement>> = ({
  children,
  type,
  ...props
}) => (
  <button
    className="py-2 px-3 border border-amber-500 text-amber-500 text-sm font-semibold uppercase rounded-sm shadow-lg shadow-amber-500/50 focus:outline-none stripes"
    {...props}
  >
    {children}
  </button>
)

export default Button
