import React from "react";
import {Outlet, useLocation} from "react-router-dom";
import {Header} from "../header/Header";
import {Footer} from "../footer/Footer";
import {ResponsiveContainer} from "../container/ResponsiveContainer";
// import { useBreakpoint } from "@/hooks/useBreakpoint.js";
import styles from "./Layout.module.css";
import {BreadCrumbs} from "@components/ui/index.js";
import ScrollLock from "@/components/scrollLock/ScrollLock";
import PageTransitionWrapper from "@components/pageTransitionWrapper/PageTransitionWrapper.jsx";
import SEO from "@/components/SEO";
import defaultSEO from "@/components/SEO/defaultSEO";

export const Layout = () => {
    // const { breakpoint, windowWidth } = useBreakpoint();
    const location = useLocation();

    // Get the current page title based on the path
    const getPageTitle = () => {
        const path = location.pathname;

        if (path === "/") return "Home";
        if (path.includes("/recipe/")) return "Recipe Details";
        if (path.includes("/add-recipe")) return "Add Recipe";
        if (path.includes("/profile")) return "User Profile";
        if (path.includes("/category/")) return "Recipe Category";
        if (path.includes("/search")) return "Search Results";

        // Default title for other pages
        return "Foodies - Your Culinary Community";
    };

    // Determine if breadcrumbs should be shown based on the current path
    const shouldShowBreadcrumbs = () => {
        // Don't show breadcrumbs on the home page
        if (location.pathname === "/") return false;

        // Don't show breadcrumbs on the design system page
        if (location.pathname === "/design-system") return false;

        // Don't show breadcrumbs on home subcategories (category pages)
        return !location.pathname.includes("/category/");
    };

    // Create SEO props with current page information
    const seoProps = {
        ...defaultSEO,
        title: getPageTitle(),
        canonicalUrl: `https://foodies-project-team-3.vercel.app${location.pathname}`,
    };

    return (
        <div id="layout" className={styles.layout}>
            {/* Apply SEO settings with current page information */}
            <SEO {...seoProps} />

            {/* Invisible H1 tag for SEO - visually hidden but accessible to screen readers */}
            <h1 className={styles.visuallyHidden}>
                {getPageTitle()} | Foodies - Your Culinary Community
            </h1>

            <ScrollLock/>
            <ResponsiveContainer>
                <PageTransitionWrapper>
                    <Header/>

                    {shouldShowBreadcrumbs() && (
                        <BreadCrumbs className={styles.breadcrumbs}/>
                    )}
                    <main className={styles.main}>
                        <Outlet/>
                    </main>
                    <Footer/>
                </PageTransitionWrapper>
            </ResponsiveContainer>
        </div>
    );
};
