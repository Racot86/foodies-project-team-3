import React from 'react';
import {Outlet} from 'react-router-dom';
import {Header} from '../header/Header';
import {Footer} from '../footer/Footer';
import {ResponsiveContainer} from '../container/ResponsiveContainer';
import {useBreakpoint} from '@/hooks/useBreakpoint.js';
import styles from './Layout.module.css';
import {Button} from "@components/ui/index.js";

export const Layout = () => {
    const {breakpoint, windowWidth} = useBreakpoint();

    // You can use breakpoint information for conditional rendering if needed
    console.log(`Current breakpoint: ${breakpoint}, Width: ${windowWidth}px`);

    return (
        <div className={styles.layout}>
            <ResponsiveContainer>
                <div style={{ marginBottom: "20px" }}>
                    <Button variant={Button.variants.PRIMARY} to="/design-system">
                        View Design System
                    </Button>
                </div>
                <Header/>
                <main className={styles.main}>
                    <Outlet/>
                </main>
                <Footer/>
            </ResponsiveContainer>
        </div>
    );
};
