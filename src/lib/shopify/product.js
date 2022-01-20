import sendReqToShopify from './shopifyClient';

// get certain product by its handle (slug word)
export async function getProductByHandle(handle) {
    const query = `{
        product(handle: "${handle}") {
            id
            handle
            title
            images(first: 5) {
                edges {
                    node {
                        url
                        altText
                    }
                }
            }
            options {
                name
                values
            }
            variants(first: 5) {
                edges {
                    node {
                        id
                        title
                        image {
                            url
                            altText
                        }
                        priceV2 {
                            amount
                        }
                        selectedOptions {
                            name
                            value
                        }
                        quantityAvailable
                    }
                }
            }
            availableForSale
        }
    }`;

    // raw data from api
    const res = await sendReqToShopify(query);
    return res.data.product;
}

// get full product list
export async function getProductList() {
    const query = `{
        products(first: 250) {
            edges {
                node {
                    id
                    handle
                    title
                    priceRange {
                        minVariantPrice {
                            amount
                        }
                    }
                    images(first: 1) {
                        edges {
                            node {
                                url
                                altText
                            }   
                        }
                    }
                    availableForSale
                }
            }
        }
    }`;

    // raw data from api
    const res = await sendReqToShopify(query);
    const products = res.data.products.edges ? res.data.products.edges : [];

    return products;
}

// get slug for LIMITED count of products (not recursive func!!!)
export async function getAllSlugs() {
    const query = `{
        products(first: 250) {
            edges {
                node {
                    handle
                }
            }
        }
    }`;

    // raw data from api
    const res = await sendReqToShopify(query);
    const slugs = res.data.products.edges ? res.data.products.edges : [];

    return slugs;
}
