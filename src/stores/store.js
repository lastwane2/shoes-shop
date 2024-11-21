import { create } from 'zustand';

export const useStore = create((set) => ({
    cart: [],
    addToCart: (product) => set((state) => {
        const newCart = [...state.cart, {...product, quantity: 1}];
        return {
            cart: newCart,
            totalPrice: newCart.reduce((sum, p) => sum + p.productPrice * p.quantity, 0),
        };
    }),
    increaseQuantity: (productKey) => set((state) => {
        const updatedCart = state.cart.map((element) =>
            element.productId === productKey ? { ...element, quantity: element.quantity + 1 } : element
        );
        return {
            cart: updatedCart,
            totalPrice: updatedCart.reduce((sum, p) => sum + p.productPrice * p.quantity, 0),
        };
    }),
    decreaseQuantity: (productKey) => set((state) => {
        const updatedCart = state.cart.map((element) =>
            element.productId === productKey && element.quantity > 1
                ? { ...element, quantity: element.quantity - 1 }
                : element
        );
        return {
            cart: updatedCart,
            totalPrice: updatedCart.reduce((sum, p) => sum + p.productPrice * p.quantity, 0),
        };
    }),
    totalPrice: 0
}));