import { usePathname } from "next/navigation";

export default function useRouterActive() {
  const pathname = usePathname();
  return (path: string) => pathname === path;
}
