import { useState, useContext, useEffect } from 'react';

import { formatPrice } from '@/utils/formats';
import { CartContext } from '@/context/cart/context';

import QtyManager from '@/components/atoms/qty';
import Options from '@/components/atoms/options';
import Loading from '@/components/atoms/loading';

export default function ProductForm({ product }) {
    const { title, handle, variants, options } = product; // parse product object
    const { cart, addItemToCart, isLoading } = useContext(CartContext);

    // create list of product variants based on all product options (size, color etc)
    const variantList = variants.edges?.map((_variant) => {
        // make object with all option values for current variant
        // selectedOptions field contains all opts for current variant in { name: ..., value: ... }
        // transform it to { name: value }
        const variantOptions = {};
        _variant.node.selectedOptions.map((item) => {
            variantOptions[item.name] = item.value;
        });

        // return all needed info for variant (product essence)
        return {
            id: _variant.node.id, // instead of global product ID
            title: title,
            handle: handle,
            options: variantOptions, // our options {name: value}
            variantTitle: _variant.node.title, // combination of opts in format "size / color / etc"
            variantPrice: _variant.node.priceV2.amount, // instead of global product PRICE
            variantQuantity: 1,
        };
    });

    const [selectedOptions, setSelectedOptions] = useState(
        variantList[0].options
    );
    const [selectedVariant, setSelectedVariant] = useState(variantList[0]);
    const [variantInCart, setVariantInCart] = useState(null); // checking selected variant in cart (variant or null)

    // check added to cart variant
    useEffect(() => {
        // check if selected product variant is already added to cart (return array obj)
        const foundItem = cart.find(_item => _item.id === selectedVariant.id)

        // set found item or null
        if (foundItem) {
            setVariantInCart(foundItem);
        } else {
            setVariantInCart(null);
        }
    }, [cart, selectedVariant]); // depends on selected variant and cart

    // update selected options and => variant
    const setOptions = (name, value) => {
        setSelectedOptions((prevState) => ({ ...prevState, [name]: value }));

        // state doesn't change immediately => copy new selected options
        const currentSelection = {
            ...selectedOptions,
            [name]: value,
        };

        // find varian with current options and select
        variantList.forEach((_variant) => {
            if (
                JSON.stringify(_variant.options) ===
                JSON.stringify(currentSelection)
            ) {
                setSelectedVariant(_variant);
            }
        });
    };

    return (
        <div>
            <h1>{title}</h1>
            <span>{formatPrice(selectedVariant.variantPrice)}</span>
            {
                // render all avaiable options for this global product
                options.map(({ name, values }, _index) => (
                    <Options
                        key={_index}
                        name={name}
                        values={values}
                        selectedOptions={selectedOptions}
                        setOptions={setOptions}
                    />
                ))
            }
            <span>View size guide</span>
            <button
                onClick={() => {
                    addItemToCart(selectedVariant);
                }}
            >
                Add To Cart
            </button>
            {variantInCart && (
                <QtyManager itemId={selectedVariant.id} itemQty={variantInCart.variantQuantity} />
            )}
            <br />
            <br />
            {isLoading && <Loading />}
        </div>
    );
}
