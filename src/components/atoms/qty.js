import { useContext, useState } from "react";

import { CartContext } from "@/context/cart/context";

export default function QtyManager({ itemId, itemQty }) {
    // itemId and itemQty are placved in created checkout (local cart)
    const { increaseItemQty, decreaseItemQty, removeItemFromCart } = useContext(CartContext);

    return (
        <div>
            {itemQty > 1 && (
                <button onClick={() => decreaseItemQty(itemId)}>-</button>
            )}
            {itemQty === 1 && (
                <button onClick={() => removeItemFromCart(itemId)}>x</button>
            )}
            <p>{itemQty}</p>
            <button onClick={() => increaseItemQty(itemId)}>+</button>
        </div>
    );
}