/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    env: {
        SHOPIFY_STOREFRONT_ACCESSTOKEN: process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN,
        SHOPIFY_STORE_ID: process.env.SHOPIFY_STORE_ID,
    },
    images: {
        domains: ['cdn.shopify.com']
    }
};

module.exports = nextConfig;
