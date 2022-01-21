import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';

import { formatPrice } from '@/utils/formats';
import { CartContext } from '@/context/cart/context';

import QtyManager from '@/components/atoms/qty';
import Options from '@/components/atoms/options';
import Loading from '@/components/atoms/loading';
import SizeGuide from '../atoms/sizeGuide';

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
            imageSrc: _variant.node.image.url,
            imageAlt: _variant.node.image.altText,
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
        const foundItem = cart.find((_item) => _item.id === selectedVariant.id);

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
        <div className='flex flex-col items-center space-y-6 m-4'>
            <div className='text-center'>
                <h1 className='mb-2'>{title}</h1>
                <p>{formatPrice(selectedVariant.variantPrice)}</p>
            </div>
            <SizeGuide />
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
            {variantInCart ? (
                <div className='p-4 w-full flex flex-col items-center space-y-4 border-black border-2'>
                    <p>В корзине</p>
                    <QtyManager
                        itemId={selectedVariant.id}
                        itemQty={variantInCart.variantQuantity}
                    />
                    {isLoading && <Loading />}
                    <div className=' py-2'>
                        <Link href='/cart'>Перейти</Link>
                    </div>
                </div>
            ) : (
                <button
                    className='button'
                    onClick={() => {
                        addItemToCart(selectedVariant);
                    }}
                >
                    В корзину
                </button>
            )}
        </div>
    );
}
