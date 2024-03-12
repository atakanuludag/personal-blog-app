"use client";

// ** next
import { usePathname } from "next/navigation";

// ** react
import { Fragment, ReactNode } from "react";

// **  mui
import Container from "@mui/material/Container";

// ** layouts
import Footer from "@/layouts/Footer";

// ** components
import DarkModeToggle from "@/components/DarkModeToggle";

export default function FullWidthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isFooterShow = ["login"].some((link) => !pathname?.includes(link));

  return (
    <Fragment>
      <Container
        component="main"
        maxWidth={false}
        sx={{ py: 3, height: "100vh" }}
      >
        {children}
        {isFooterShow && <Footer />}
      </Container>
      {isFooterShow && <DarkModeToggle />}
    </Fragment>
  );
}
