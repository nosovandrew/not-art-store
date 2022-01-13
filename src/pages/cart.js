import { useContext } from 'react';

import { CartContext } from '@/context/cart/context';
import { formatPrice } from '@/utils/formats';

import QtyManager from '@/components/atoms/qty';
import Loading from '@/components/atoms/loading';

export default function Cart() {
    const { cart, checkoutUrl, isLoading } = useContext(CartContext);

    // calc total price of cart (last arg 0 is init value of first arg in first run of reduce func)
    const cartTotal = cart.reduce(
        (total, item) => total + Number(item?.variantPrice),
        0
    );

    return (
        <div>
            <h1>Cart</h1>
            <span>--------</span>
            <div>
                {cart.length === 0 ? (
                    <p>Корзина пуста</p>
                ) : (
                    cart.map((_item, index) => (
                        <div key={index}>
                            <h3>{_item.title}</h3>
                            <p>{_item.variantTitle}</p>
                            <QtyManager itemId={_item.id} itemQty={_item.variantQuantity} />
                            {isLoading && <Loading />}
                            <span>--------</span>
                        </div>
                    ))
                )}
            </div>
            Сумма корзины: {formatPrice(cartTotal)}
            <a href={checkoutUrl}>Перейти к оплате</a>
        </div>
    );
}
