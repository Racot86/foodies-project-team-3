import { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * SEO component for managing meta tags, title, and other SEO-related elements
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - Page keywords (comma-separated)
 * @param {string} props.ogTitle - Open Graph title (defaults to title)
 * @param {string} props.ogDescription - Open Graph description (defaults to description)
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.ogUrl - Open Graph URL (canonical URL)
 * @param {string} props.ogType - Open Graph type (defaults to 'website')
 * @param {Object} props.jsonLd - JSON-LD structured data object
 * @returns {null} - This component doesn't render anything
 */
const SEO = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  ogType = 'website',
  jsonLd,
}) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = `${title} | Foodies`;
    }

    // Helper function to create or update meta tags
    const updateMetaTag = (name, content) => {
      if (!content) return;

      // Try to find existing meta tag
      let metaTag = document.querySelector(`meta[name="${name}"]`) ||
                    document.querySelector(`meta[property="${name}"]`);

      // If meta tag doesn't exist, create it
      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (name.startsWith('og:')) {
          metaTag.setAttribute('property', name);
        } else {
          metaTag.setAttribute('name', name);
        }
        document.head.appendChild(metaTag);
      }

      // Set content attribute
      metaTag.setAttribute('content', content);
    };

    // Update basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Update Open Graph meta tags
    updateMetaTag('og:title', ogTitle || title);
    updateMetaTag('og:description', ogDescription || description);
    updateMetaTag('og:image', ogImage);
    updateMetaTag('og:url', ogUrl);
    updateMetaTag('og:type', ogType);

    // Update Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', ogTitle || title);
    updateMetaTag('twitter:description', ogDescription || description);
    updateMetaTag('twitter:image', ogImage);

    // Add JSON-LD structured data if provided
    if (jsonLd) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]');

      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }

      scriptTag.textContent = JSON.stringify(jsonLd);
    }

    // Cleanup function to remove meta tags when component unmounts
    return () => {
      // We don't remove meta tags on cleanup as they should persist
      // But we can remove JSON-LD if needed
      if (jsonLd) {
        const scriptTag = document.querySelector('script[type="application/ld+json"]');
        if (scriptTag) {
          document.head.removeChild(scriptTag);
        }
      }
    };
  }, [
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    ogType,
    jsonLd,
  ]);

  // This component doesn't render anything
  return null;
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  ogTitle: PropTypes.string,
  ogDescription: PropTypes.string,
  ogImage: PropTypes.string,
  ogUrl: PropTypes.string,
  ogType: PropTypes.string,
  jsonLd: PropTypes.object,
};

export default SEO;
