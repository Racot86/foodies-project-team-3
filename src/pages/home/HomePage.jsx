import { Outlet } from 'react-router-dom';
import styles from './HomePage.module.css';
import Page from '../../components/page/Page';
import Hero from '@pages/home/components/hero/Hero';
import TestimonialCard from '../../components/TestimonialCard';

function HomePage() {
  return (
    <Page className={styles.homePage}>
          <Hero />
          <Outlet />
      <TestimonialCard />
    
    </Page>
  );
}

export default HomePage;
