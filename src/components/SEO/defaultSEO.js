/**
 * Default SEO configuration for the Foodies application
 * These values will be used as fallbacks if specific values are not provided
 */
const defaultSEO = {
  // Basic SEO
  title: 'Foodies',
  description: 'Discover, share, and save your favorite recipes with Foodies - your culinary community.',
  keywords: 'recipes, food, cooking, culinary, foodies, meals, dishes',

  // Open Graph
  ogTitle: 'Foodies - Your Culinary Community',
  ogDescription: 'Discover, share, and save your favorite recipes with Foodies - your culinary community.',
  ogImage: 'https://foodies-project-team-3.vercel.app/og-image.jpg', // Replace with actual image URL
  ogUrl: 'https://foodies-project-team-3.vercel.app',
  ogType: 'website',

  // JSON-LD structured data for website
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Foodies',
    url: 'https://foodies-project-team-3.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://foodies-project-team-3.vercel.app/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    description: 'Discover, share, and save your favorite recipes with Foodies - your culinary community.'
  }
};

export default defaultSEO;
