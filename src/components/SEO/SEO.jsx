import { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Enhanced SEO component for managing meta tags, title, and other SEO-related elements
 * Optimized for performance and better PageSpeed scores
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
 * @param {string} props.canonicalUrl - Canonical URL for the page
 * @param {string} props.language - Page language (defaults to 'en')
 * @param {string} props.robots - Robots meta tag content
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
  canonicalUrl,
  language = 'en',
  robots = 'index, follow',
}) => {
  useEffect(() => {
    // Create a document fragment for batch DOM operations
    const fragment = document.createDocumentFragment();
    const tagsToUpdate = [];

    // Update document title
    if (title) {
      document.title = `${title} | Foodies`;
    }

    // Helper function to create or update meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      if (!content) return;

      // Try to find existing meta tag
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let metaTag = document.querySelector(selector);

      // If meta tag doesn't exist, create it
      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (isProperty) {
          metaTag.setAttribute('property', name);
        } else {
          metaTag.setAttribute('name', name);
        }
        tagsToUpdate.push({ tag: metaTag, parent: document.head });
      }

      // Set content attribute
      metaTag.setAttribute('content', content);
    };

    // Update language attribute on html tag
    document.documentElement.setAttribute('lang', language);

    // Update basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', robots);

    // Update Open Graph meta tags
    updateMetaTag('og:title', ogTitle || title, true);
    updateMetaTag('og:description', ogDescription || description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:url', ogUrl || canonicalUrl, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:site_name', 'Foodies', true);

    // Update Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', ogTitle || title);
    updateMetaTag('twitter:description', ogDescription || description);
    updateMetaTag('twitter:image', ogImage);

    // Add additional meta tags for mobile optimization
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');
    updateMetaTag('theme-color', '#ffffff');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'default');

    // Add canonical URL if provided
    if (canonicalUrl) {
      let linkTag = document.querySelector('link[rel="canonical"]');
      if (!linkTag) {
        linkTag = document.createElement('link');
        linkTag.setAttribute('rel', 'canonical');
        tagsToUpdate.push({ tag: linkTag, parent: document.head });
      }
      linkTag.setAttribute('href', canonicalUrl);
    }

    // Add JSON-LD structured data if provided
    if (jsonLd) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]');

      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        tagsToUpdate.push({ tag: scriptTag, parent: document.head });
      }

      scriptTag.textContent = JSON.stringify(jsonLd);
    }

    // Batch append all new tags to the document
    tagsToUpdate.forEach(({ tag, parent }) => {
      if (!parent.contains(tag)) {
        fragment.appendChild(tag);
      }
    });

    if (fragment.childNodes.length > 0) {
      document.head.appendChild(fragment);
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
    canonicalUrl,
    language,
    robots,
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
  canonicalUrl: PropTypes.string,
  language: PropTypes.string,
  robots: PropTypes.string,
};

export default SEO;
