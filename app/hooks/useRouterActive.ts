import { useRouter } from 'next/router'

export default function useRouterActive() {
  const router = useRouter()
  return (path: string) => router.pathname === path
}
