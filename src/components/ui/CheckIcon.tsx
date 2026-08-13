import { assetUrl } from '../../lib/assets'

export function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <img
      src={assetUrl('images/a4ce0581ce7807b6.svg')}
      alt=""
      width={size}
      height={size}
    />
  )
}
