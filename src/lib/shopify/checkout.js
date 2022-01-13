import sendReqToShopify from './shopifyClient';

// create checkout in Shopify (get checkout ID and URL with form)
export async function createCheckout(id, qty) {
    const query = `
    mutation {
        checkoutCreate(input: {
            lineItems: [{variantId: "${id}", quantity: ${qty}}]
        }) {
            checkout {
                id
                webUrl
            }
        }
    }`;

    // send req for checkout update and receive raw res
    const res = await sendReqToShopify(query);

    return res.data.checkoutCreate.checkout;
}

// update current checkout with new items (NOT to create new checkout obj for new items in cart)
export async function updateCheckout(checkoutId, lineItems) {
    // processing the array to send in the request
    const preparedItems = lineItems.map(
        (_item) =>
            `{
                variantId: "${_item.id}",
                quantity: ${_item.variantQuantity},
            }`
    );

    const query = `
        mutation {
            checkoutLineItemsReplace(lineItems: [${preparedItems}], checkoutId: "${checkoutId}") {
                checkout {
                    id
                    webUrl
                    lineItems(first: 25) {
                        edges {
                            node {
                                id
                                title
                                quantity
                            }
                        }
                    }
                }
            }
        }`;

    // send req for checkout update and receive raw res
    const res = await sendReqToShopify(query);

    return res.data.checkoutLineItemsReplace.checkout;
}

// get already created checkout session data via ID
export async function getExistingCheckout(checkoutId) {
    const query =`{
        node(id: "${checkoutId}") {
            ... on Checkout {
                id
                completedAt
            }
        }
    }`;

    const res = await sendReqToShopify(query);

    return res.data.node;
}
