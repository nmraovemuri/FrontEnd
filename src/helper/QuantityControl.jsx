import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../components/CartContext'; // adjust path if needed

const QuantityControl = ({ initialQuantity = 1, productId, unitId }) => {
    const [quantity, setQuantity] = useState(initialQuantity);
    const { updateQuantity } = useContext(CartContext);

    useEffect(() => {
        setQuantity(initialQuantity); // keep in sync if prop changes
    }, [initialQuantity]);

    const incrementQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateQuantity(productId, unitId, newQuantity);
    };

    const decrementQuantity = () => {
        const newQuantity = quantity > 1 ? quantity - 1 : 1;
        setQuantity(newQuantity);
        updateQuantity(productId, unitId, newQuantity);
    };

    return (
        <div className="d-flex rounded-4 overflow-hidden">
            <button
                type="button"
                onClick={decrementQuantity}
                className="quantity__minus border border-end border-gray-100 flex-shrink-0 h-48 w-48 text-neutral-600 flex-center hover-bg-main-600 hover-text-white"
            >
                <i className="ph ph-minus" />
            </button>
            <input
                type="number"
                className="quantity__input flex-grow-1 border border-gray-100 border-start-0 border-end-0 text-center w-32 px-4"
                value={quantity}
                min={1}
                readOnly
            />
            <button
                type="button"
                onClick={incrementQuantity}
                className="quantity__plus border border-end border-gray-100 flex-shrink-0 h-48 w-48 text-neutral-600 flex-center hover-bg-main-600 hover-text-white"
            >
                <i className="ph ph-plus" />
            </button>
        </div>
    );
};

export default QuantityControl;
