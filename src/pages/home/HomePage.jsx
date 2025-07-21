import {Outlet} from 'react-router-dom';
import styles from './HomePage.module.css';
import Page from '../../components/page/Page';
import {Hero} from '@pages/home/components/hero/Hero.jsx';
import Testimonials from '@pages/home/components/testimonials/Testimonials';
import SEO from '@/components/SEO';

function HomePage() {
    // Define home page specific SEO values
    const homeSEO = {
        title: 'Home',
        description: 'Discover delicious recipes, cooking tips, and connect with food lovers on Foodies - your ultimate culinary community.',
        keywords: 'home, recipes, food, cooking, culinary, foodies, meals, dishes, community',
        ogTitle: 'Foodies - Discover Delicious Recipes',
        ogDescription: 'Explore a world of culinary delights with Foodies - your ultimate destination for recipes and cooking inspiration.',
        ogType: 'website',
        jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Foodies - Home',
            description: 'Discover delicious recipes, cooking tips, and connect with food lovers on Foodies - your ultimate culinary community.',
            url: 'https://foodies-project-team-3.vercel.app/'
        }
    };

    return (
        <Page className={styles.homePage}>
            {/* Apply home page specific SEO */}
            <SEO {...homeSEO} />

            <Hero/>
            <Outlet/>
            <Testimonials/>
        </Page>
    );
}

export default HomePage;
