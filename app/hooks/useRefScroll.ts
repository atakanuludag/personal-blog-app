export default function useRefScroll(ref: React.MutableRefObject<any>) {
  return () => {
    if (ref?.current)
      setTimeout(
        () => ref?.current?.scrollIntoView({ behavior: 'smooth' }),
        300,
      )
  }
}
