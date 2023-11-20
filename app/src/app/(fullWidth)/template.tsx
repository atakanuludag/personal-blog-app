"use client";

// ** react
import { Fragment, ReactNode, useEffect, useState } from "react";

// **  mui
import Container from "@mui/material/Container";

// ** layouts
import Footer from "@/layouts/Footer";

// ** components
import DarkModeToggle from "@/components/DarkModeToggle";

export default function Template({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <Fragment>
      <Container component="main" maxWidth={false} sx={{ py: 3 }}>
        {children}
        <Footer />
      </Container>
      <DarkModeToggle />
    </Fragment>
  );
}
