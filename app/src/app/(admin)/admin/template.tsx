"use client";

// ** react
import { ReactNode, useEffect, useState } from "react";

// **  mui
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

// ** third party
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { setDefaultOptions } from "date-fns/setDefaultOptions";
import { tr as dateFnsLocaleTR } from "date-fns/locale";

// ** layouts
import Navigation from "@/layouts/navigation/admin";
import Header from "@/layouts/navigation/admin/Header";

// ** components
import FormDrawer from "@/components/admin/shared/FormDrawer";
import ConfirmDialog from "@/components/admin/shared/ConfirmDialog";
import Popover from "@/components/admin/shared/Popover";

export default function Template({ children }: { children: ReactNode }) {
  setDefaultOptions({ locale: dateFnsLocaleTR });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      })
  );

  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));

  if (!mounted) return <></>;

  return (
    <QueryClientProvider client={queryClient}>
      <FormDrawer />
      <ConfirmDialog />
      <Popover />
      <Box display="flex" width="100%">
        <Header matchDownMD={matchDownMD} />

        <Navigation matchDownMD={matchDownMD} />

        <Container component="main" maxWidth={false} sx={{ py: 3, mt: 8 }}>
          {children}
        </Container>
      </Box>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
