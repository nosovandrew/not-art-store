import { useContext, useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';

import { CartContext } from '@/context/cart/context';
import { formatPrice } from '@/utils/formats';

import Layout from '@/components/templates/layout';
import CartItem from '@/components/molecules/cartItem';
import Loading from '@/components/atoms/loading';

export default function Cart() {
    const { cart, checkoutUrl, isLoading } = useContext(CartContext);
    const [cartTotal, setCartTotal] = useState(0); // cart total state

    // calc total price of cart (last arg 0 is init value of first arg in first run of reduce func)
    const getCartTotal = (cart) => {
        const total = cart.reduce((total, item) => total + Number(item?.variantPrice * item?.variantQuantity), 0);
        setCartTotal(total);
    }

    // recalc cart total when cart was changed
    useEffect(() => {
        getCartTotal(cart);
    }, [cart])

    return (
        <Layout>
            <NextSeo
                title='Корзина'
                description='Страница с товарами, которые выбраны клиентом для покупки. Тут можно увеличить/уменьшить количество товара, а также перейти к оплате.'
            />
            {/* <h1>Корзина</h1> */}
            {cart.length === 0 ? (
                <div className='flex justify-center'>
                    <p>Корзина пуста :(</p>
                </div>
            ) : (
                <div className='w-full flex flex-col items-center space-y-6'>
                    <div className='flex flex-col items-start space-y-4'>
                        {cart.map((_item, _index) => (
                            <CartItem
                                key={_index}
                                id={_item.id}
                                imageSrc={_item.imageSrc}
                                imageAlt={_item.imageAlt}
                                title={_item.title}
                                variantTitle={_item.variantTitle}
                                variantQuantity={_item.variantQuantity}
                                variantPrice={_item.variantPrice}
                            />
                        ))}
                    </div>
                    <p className='text-center'>Сумма корзины: {formatPrice(cartTotal)}</p>
                    <a className='button' href={checkoutUrl}>
                        {isLoading ? <Loading /> : 'Доставка и оплата'}
                    </a>
                </div>
            )}
        </Layout>
    );
}
