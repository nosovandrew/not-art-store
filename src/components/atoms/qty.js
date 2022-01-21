import { useContext } from "react";

import { CartContext } from "@/context/cart/context";

export default function QtyManager({ itemId, itemQty }) {
    // itemId and itemQty are placved in created checkout (local cart)
    const { increaseItemQty, decreaseItemQty, removeItemFromCart, isLoading } = useContext(CartContext);

    return (
        <div className='flex items-center space-x-4'>
            {itemQty > 1 && (
                <button className='square-button' onClick={() => decreaseItemQty(itemId)} disabled={isLoading ? true : false}>-</button>
            )}
            {itemQty === 1 && (
                <button className='square-button' onClick={() => removeItemFromCart(itemId)} disabled={isLoading ? true : false}>x</button>
            )}
            <p>{itemQty}</p>
            <button className='square-button' onClick={() => increaseItemQty(itemId)} disabled={isLoading ? true : false}>+</button>
        </div>
    );
}