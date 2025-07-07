import React from 'react';
import {Outlet} from 'react-router-dom';
import styles from './HomePage.module.css';
import Page from '../../components/page/Page';
import {Hero} from '@components/hero/Hero.jsx';
import Testimonials from '@components/testimonials/Testimonials';

function HomePage() {

    return (
        <Page className={styles.homePage}>
            <Hero/>

            {/* Example of using the responsive components */}
            {/*<ResponsiveExample />*/}

            <Outlet/>
            <Testimonials/>
        </Page>
    );
}

export default HomePage;
