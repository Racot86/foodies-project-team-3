import React from "react";
import {Link} from "react-router-dom";
import SEO from "@/components/SEO";

const NotFoundPage = () => {
    // Define 404 page specific SEO values
    const notFoundSEO = {
        title: '404 - Page Not Found',
        description: 'The page you are looking for does not exist. Please check the URL or return to the home page.',
        keywords: '404, not found, error, page not found',
        ogTitle: '404 - Page Not Found | Foodies',
        ogDescription: 'The page you are looking for does not exist. Please check the URL or return to the home page.',
        ogType: 'website',
        jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: '404 - Page Not Found',
            description: 'The page you are looking for does not exist. Please check the URL or return to the home page.'
        }
    };

    return (
        <React.Fragment>
            <SEO {...notFoundSEO} />
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
                padding: "0 20px"
            }}>
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <Link to="/" style={{
                    marginTop: "20px",
                    textDecoration: "none",
                    color: "#FF6B0A",
                    fontWeight: "bold"
                }}>
                    Return to Home Page
                </Link>
            </div>
        </React.Fragment>
    );
};

export default NotFoundPage;
