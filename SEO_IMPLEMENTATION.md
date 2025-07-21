# SEO Implementation for Foodies Project

## Overview

This document outlines the SEO implementation for the Foodies Project. The implementation includes:

1. A custom SEO component for managing meta tags
2. Default SEO configuration
3. Page-specific SEO for different routes
4. Structured data (JSON-LD) for Google
5. Open Graph tags for social media sharing
6. Twitter Card tags for Twitter sharing

## Components Created

### 1. SEO Component (`src/components/SEO/SEO.jsx`)

A reusable component that manages meta tags, title, and other SEO-related elements. It accepts props for:
- Title
- Description
- Keywords
- Open Graph tags
- JSON-LD structured data

The component uses the `useEffect` hook to update the document head when it mounts or when its props change.

### 2. Default SEO Configuration (`src/components/SEO/defaultSEO.js`)

A configuration file that defines default SEO values for the application, including:
- Basic SEO metadata (title, description, keywords)
- Open Graph tags for social media sharing
- JSON-LD structured data for the website

## Implementation in Pages

### Layout Component (`src/components/layout/Layout.jsx`)

The Layout component includes the SEO component with default SEO values, ensuring that all pages have basic SEO metadata.

### Home Page (`src/pages/home/HomePage.jsx`)

The Home page includes page-specific SEO with:
- Title: "Home"
- Description focused on discovering recipes and connecting with food lovers
- Open Graph tags for social media sharing
- JSON-LD structured data for the web page

### Recipe Details Page (`src/pages/recipe-details/RecipeDetails.jsx`)

The Recipe Details page includes dynamic SEO based on the recipe data:
- Title: Recipe title
- Description: Recipe description or a generated description
- Open Graph tags including the recipe image
- JSON-LD structured data for the recipe, including ingredients, instructions, and cooking time

### Add Recipe Page (`src/pages/add-recipe/AddRecipePage.jsx`)

The Add Recipe page includes page-specific SEO with:
- Title: "Add Recipe"
- Description focused on sharing culinary creations
- Open Graph tags for social media sharing
- JSON-LD structured data for the web page

### Profile Page (`src/pages/profile/ProfilePage.jsx`)

The Profile page includes dynamic SEO based on the user profile:
- Title: "My Profile" or "[User]'s Profile"
- Description that changes based on whether it's the current user's profile or another user's profile
- Open Graph tags including the user's avatar
- JSON-LD structured data for the person

### Not Found Page (`src/pages/not-found/NotFoundPage.jsx`)

The Not Found page includes page-specific SEO with:
- Title: "404 - Page Not Found"
- Description explaining that the page doesn't exist
- Open Graph tags for social media sharing
- JSON-LD structured data for the web page

## SEO Assets

### Favicon

The site uses a custom SVG favicon located at:
- `public/favicon.svg` - Vector-based favicon that scales well across different devices and resolutions

This favicon is referenced in the HTML head using:
```html
<link href="/favicon.svg" rel="icon" type="image/svg+xml"/>
```

### Open Graph Image

For social media sharing, the site uses a default Open Graph image:
- `public/og-image.jpg` - 1920x1080 image used when sharing content on social media platforms

This image is referenced in the default SEO configuration (`defaultSEO.js`):
```javascript
ogImage: 'https://foodies-project-team-3.vercel.app/og-image.jpg'
```

## Browser Compatibility

The SEO implementation uses standard DOM APIs that are supported by all modern browsers, ensuring compatibility with:
- Google Chrome
- Mozilla Firefox
- Safari
- Microsoft Edge
- Opera

## Testing

To verify that the SEO implementation is working correctly:
1. Use browser developer tools to inspect the document head and verify that the meta tags are correctly rendered
2. Use SEO testing tools like Google's Structured Data Testing Tool or Facebook's Sharing Debugger to verify that the structured data and Open Graph tags are correctly implemented
3. Test the application in different browsers to ensure compatibility

## Future Improvements

Potential future improvements to the SEO implementation:
1. Add canonical URLs to prevent duplicate content issues
2. Implement dynamic sitemap generation
3. Add more structured data types for specific content
4. Implement AMP (Accelerated Mobile Pages) for better mobile performance
5. Add hreflang tags for multilingual support if the application expands to multiple languages
