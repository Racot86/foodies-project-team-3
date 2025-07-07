import React from 'react';
import {Outlet} from 'react-router-dom';
import {Header} from '../header/Header';
import {Footer} from '../footer/Footer';
import {ResponsiveContainer} from '../container/ResponsiveContainer';
import {useBreakpoint} from '@/hooks/useBreakpoint.js';
import styles from './Layout.module.css';

export const Layout = () => {
    const {breakpoint, windowWidth} = useBreakpoint();

    // You can use breakpoint information for conditional rendering if needed
    console.log(`Current breakpoint: ${breakpoint}, Width: ${windowWidth}px`);

    return (
        <div className={styles.layout}>
            <ResponsiveContainer>
                <Header/>
                <main className={styles.main}>
                    <Outlet/>
                </main>
                <Footer/>
            </ResponsiveContainer>
        </div>
    );
};
