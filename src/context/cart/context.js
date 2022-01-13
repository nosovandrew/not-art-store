import { createContext, useState, useEffect } from 'react';

import {
    createCheckout,
    updateCheckout,
    getExistingCheckout,
} from '@/lib/shopify/checkout';

export const CartContext = createContext(); // create global state essence

export default function CartContextProvider({ children }) {
    const [cart, setCart] = useState([]); // cart items list
    const [checkoutId, setCheckoutId] = useState(''); // ID of current Shopify checkout session
    const [checkoutUrl, setCheckoutUrl] = useState(''); // URL to external checkout form
    const [isLoading, setIsLoading] = useState(false);

    // <<< PERSISTENT CART VIA LOCALSTORAGE started >>>
    // all persistant functionality placed in this file
    // initial getting data from localStorage
    useEffect(() => {
        // inner async func solve problem with unnecessary return inside effect
        const initCheckout = async () => {
            // get checkout data from localStorage
            const previousCheckout = JSON.parse(
                localStorage.getItem('previous_checkout')
            );
            // set data from localStorage to state FUNC
            const setCheckoutInState = (checkoutObject) => {
                // put persistent data to state
                setCart(checkoutObject.lineItems);
                setCheckoutId(checkoutObject.id);
                setCheckoutUrl(checkoutObject.webUrl);
            };
            // if localStorage has checkout obj and id isn't empty string
            if (previousCheckout && previousCheckout.id) {
                try {
                    // fetch checkout obj from Shopify via persisted id
                    const fetchedCheckout = await getExistingCheckout(
                        previousCheckout.id
                    );
                    // make sure this cart hasn’t already been paid
                    if (!fetchedCheckout.completedAt) {
                        setCheckoutInState(previousCheckout);
                        return;
                    }
                } catch (error) {
                    // console.log(error);
                    localStorage.setItem('previous_checkout', null);
                }
            }
        }

        initCheckout();
    }, []); // [] means that code runs only 1 time for initial stage

    // up to date localStorage (updating localStorage when cart is changed)
    useEffect(() => {
        localStorage.setItem(
            'previous_checkout',
            JSON.stringify({
                lineItems: cart,
                id: checkoutId,
                webUrl: checkoutUrl,
            })
        ); // add cart to LS
    }, [cart, checkoutId, checkoutUrl]); // [dependencies] means that code runs when dependency is changed
    // <<< PERSISTENT CART ended >>>

    // add item to cart func
    // cart is ARRAY
    const addItemToCart = async (newItem) => {
        // check if cart is empty (whether to create or update checkout session)
        if (cart.length === 0) {
            // add item to cart list
            setCart([newItem]);
            // create new Shopify checkout session
            // variantQty is alwais 1 (for now)
            const checkout = await createCheckout(
                newItem.id,
                newItem.variantQuantity
            );
            setCheckoutId(checkout.id);
            setCheckoutUrl(checkout.webUrl);

            // time to localStorage
        } else {
            let updatedCart = [...cart]; // copy cart list
            let isExistItem = false; // flag
            // check whether product already exist in cart
            updatedCart.forEach((_item) => {
                if (_item.id === newItem.id) {
                    // product already exist -> increase
                    _item.variantQuantity += 1;
                    isExistItem = true; // set exist flag to true
                }
            });
            // check if product is new -> just add new item
            if (!isExistItem) {
                updatedCart.push(newItem); // update cart with new item
            }

            setCart(updatedCart); // update global state
            const updatedCheckout = await updateCheckout(
                checkoutId,
                updatedCart
            ); // update Shopify checkout session
        }
    };

    // remove item from cart func
    const removeItemFromCart = async (itemToRemoveId) => {
        const updatedCart = cart.filter((_item) => _item.id !== itemToRemoveId); // remove item from cart

        setCart(updatedCart); // update global state
        const updatedCheckout = await updateCheckout(checkoutId, updatedCart); // update Shopify checkout session
    };

    // inc item qty for sale
    const increaseItemQty = async (itemToIncId) => {
        setIsLoading(true);
        // copy cart list
        const updatedCart = [...cart];
        // inc qty for item
        cart.forEach((_item) => {
            if (_item.id === itemToIncId) _item.variantQuantity += 1;
        });

        setCart(updatedCart); // update state
        const updatedCheckout = await updateCheckout(checkoutId, updatedCart); // update Shopify checkout session
        setIsLoading(false);
    };

    // dec item qty for sale
    const decreaseItemQty = async (itemToDecId) => {
        setIsLoading(true);
        // copy cart list
        const updatedCart = [...cart];
        // dec qty for item
        cart.forEach((_item) => {
            if (_item.id === itemToDecId) _item.variantQuantity -= 1;
        });
        setCart(updatedCart); // update state
        const updatedCheckout = await updateCheckout(checkoutId, updatedCart); // update Shopify checkout session
        setIsLoading(false);
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                checkoutUrl,
                addItemToCart,
                removeItemFromCart,
                increaseItemQty,
                decreaseItemQty,
                loading,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// context consumer ???
export const CartConsumer = CartContext.Consumer;
