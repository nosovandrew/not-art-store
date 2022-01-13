const storeId = process.env.SHOPIFY_STORE_ID;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;

// main data fetcher (POST to Shopify GraphQL API endpoint with access token and query)
export default async function sendReqToShopify(query) {
    // GraphQL API endpoint
    const apiEndpoint = `https://${storeId}.myshopify.com/api/2022-01/graphql.json`;

    // request options
    const options = {
        endpoint: apiEndpoint,
        method: 'POST',
        headers: {
            'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }), // out gql query here
    };

    try {
        // fetch our data from Shopify
        const data = await fetch(apiEndpoint, options).then((res) => {
            return res.json();
        });
        
        return data;
    } catch (error) {
        throw new Error('Data from Shopify not fetched!');
    }
}