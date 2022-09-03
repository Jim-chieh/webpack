import React, { useContext, useState } from 'react';

const CartItemsContext = React.createContext();
const UpdateCartItemsContext = React.createContext();

export function useCartItems() {
	return useContext(CartItemsContext);
}

export function useUpdateCartItems() {
	return useContext(UpdateCartItemsContext);
}

export function CartItemsProvider({ children }) {
	const [cartItems, setCartItems] = useState(
		JSON.parse(window.localStorage.getItem('cartItems')) || []
	);

	function updateCartItems(newcartItems) {
		setCartItems(newcartItems);
	}

	return (
		<CartItemsContext.Provider value={cartItems}>
			<UpdateCartItemsContext.Provider value={updateCartItems}>
				{children}
			</UpdateCartItemsContext.Provider>
		</CartItemsContext.Provider>
	);
}
