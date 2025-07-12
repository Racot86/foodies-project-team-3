import React from 'react';
import {Outlet} from 'react-router-dom';
import styles from './HomePage.module.css';
import Page from '../../components/page/Page';
import { Hero } from '@pages/home/components/hero/Hero.jsx';
import CategoriesBlock from "../../components/СategoriesBlock/components/CategoriesBlock";
import Testimonials from '@pages/home/components/testimonials/Testimonials';

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
