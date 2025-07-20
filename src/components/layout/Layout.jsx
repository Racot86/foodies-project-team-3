import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { ResponsiveContainer } from "../container/ResponsiveContainer";
import { useBreakpoint } from "@/hooks/useBreakpoint.js";
import styles from "./Layout.module.css";
import { Button, BreadCrumbs } from "@components/ui/index.js";
import ScrollLock from "@/components/scrollLock/ScrollLock";

export const Layout = () => {
  const { breakpoint, windowWidth } = useBreakpoint();
  const location = useLocation();

  // You can use breakpoint information for conditional rendering if needed
  console.log(`Current breakpoint: ${breakpoint}, Width: ${windowWidth}px`);

  // Determine if breadcrumbs should be shown based on the current path
  const shouldShowBreadcrumbs = () => {
    // Don't show breadcrumbs on the home page
    if (location.pathname === "/") return false;

    // Don't show breadcrumbs on the design system page
    if (location.pathname === "/design-system") return false;

    // Don't show breadcrumbs on home subcategories (category pages)
    return !location.pathname.includes("/category/");
  };

  return (
    <div id="layout" className={styles.layout}>
      <ScrollLock />
      <ResponsiveContainer>
        <Header />
        {shouldShowBreadcrumbs() && (
          <BreadCrumbs className={styles.breadcrumbs} />
        )}
        <main className={styles.main}>
          <Outlet />
        </main>
        <Footer />
      </ResponsiveContainer>
    </div>
  );
};
