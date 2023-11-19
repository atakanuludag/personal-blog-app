// ** react
import { Fragment, ReactNode } from "react";

// **  mui
import Container from "@mui/material/Container";

// ** models
import { OrderType } from "@/models/enums";
import CategoryModel from "@/models/CategoryModel";
import PageModel from "@/models/PageModel";

// ** layouts
import Navigation from "@/layouts/navigation/blog";
import Footer from "@/layouts/Footer";

// ** components
import DarkModeToggle from "@/components/DarkModeToggle";

// ** services
import CategoryService from "@/services/CategoryService";
import PageService from "@/services/PageService";

// ** config
import { NAVBAR_PAGE_IDS } from "@/config";

export default async function Template({ children }: { children: ReactNode }) {
  const categories = (await CategoryService.getItems({
    sType: "parent",
    s: "null",
    order: "order",
    orderBy: OrderType.DESC,
  })) as CategoryModel[];

  const navbarPageIds = NAVBAR_PAGE_IDS?.split(",") || [];
  const navbarPages = new Array<PageModel>();

  for await (const pageId of navbarPageIds) {
    try {
      const page = await PageService.getItemById(pageId);
      if (page) navbarPages.push(page);
    } catch (err) {}
  }

  return (
    <Fragment>
      <Navigation categories={categories} navbarPages={navbarPages} />
      <Container component="main" maxWidth={false} sx={{ py: 3 }}>
        {children}
        <Footer />
      </Container>
      <DarkModeToggle />
    </Fragment>
  );
}
