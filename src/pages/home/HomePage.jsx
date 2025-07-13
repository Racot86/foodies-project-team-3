import {Outlet} from 'react-router-dom';
import styles from './HomePage.module.css';
import Page from '../../components/page/Page';
import Hero from '@pages/home/components/hero/Hero';
import Testimonials from "@pages/home/components/testimonials/Testimonials.jsx";

function HomePage() {
    return (
        <Page className={styles.homePage}>
            <Hero/>
            <Outlet/>
            <Testimonials/>
        </Page>
    );
}

export default HomePage;
