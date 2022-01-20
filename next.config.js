/**
 * @type {import('next').NextConfig}
 */

// types folder fixes problem with below requirements
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const nextConfig = {
    env: {
        SHOPIFY_STOREFRONT_ACCESSTOKEN:
            process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN,
        SHOPIFY_STORE_ID: process.env.SHOPIFY_STORE_ID,
        VERCEL_ENV: process.env.VERCEL_ENV,
        HOST: process.env.HOST,
    },
    images: {
        domains: ['cdn.shopify.com'],
    },
};

const fullConfig = withPlugins(
    [
        withPWA({
            pwa: {
                dest: 'public',
                disable: process.env.VERCEL_ENV === 'development',
                // fix sw issue (may cause other bugs!)
                runtimeCaching,
                buildExcludes: [/middleware-manifest.json$/],
            },
        }),
    ],
    nextConfig
);

module.exports = fullConfig;
