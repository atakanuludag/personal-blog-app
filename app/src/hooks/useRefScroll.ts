import { MutableRefObject } from 'react'

export default function useRefScroll(ref: MutableRefObject<any>) {
  return () => {
    if (ref?.current)
      setTimeout(
        () => ref?.current?.scrollIntoView({ behavior: 'smooth' }),
        300,
      )
  }
}
