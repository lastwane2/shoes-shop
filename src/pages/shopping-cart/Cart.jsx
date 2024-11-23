import {useStore} from "../../stores/store.js"

export function Cart () {
    const cartData = useStore((state) => state.cart)
    const increaseProductQuantity = useStore((state) => state.increaseQuantity)
    const decreaseProductQuantity = useStore((state) => state.decreaseQuantity)
    const deleteProduct = useStore((state) => state.deleteProduct)
    const totalPrice = useStore((state) => state.totalPrice);

    return (
        <div className="bg-gray-100 h-screen py-8">
            <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-3/4">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                            <table className="w-full">
                                <thead>
                                <tr>
                                    <th className="text-left font-semibold">Product</th>
                                    <th className="text-left font-semibold">Price</th>
                                    <th className="text-left font-semibold">Quantity</th>
                                    <th className="text-left font-semibold">Total</th>
                                </tr>
                                </thead>
                                {cartData.map((cartItem) => {
                                    return (
                                        <tbody key={cartItem.productId}>
                                        <tr>
                                            <td className="py-4">
                                                <div className="flex items-center">
                                                    <img className="h-8 w-16 mr-4"
                                                         src={cartItem.image}
                                                         alt="Product image"/>
                                                    <span className="font-semibold">{cartItem.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4">{cartItem.productPrice}</td>
                                            <td className="py-4">
                                                <div className="flex items-center">
                                                    <button
                                                        className="border rounded-md py-2 px-4 mr-2"
                                                        onClick={() => decreaseProductQuantity(cartItem.productId)}
                                                    >-</button>
                                                    <span className="text-center w-8">{cartItem.quantity}</span>
                                                    <button
                                                        className="border rounded-md py-2 px-4 ml-2"
                                                        onClick={() => increaseProductQuantity(cartItem.productId)}
                                                    >+</button>
                                                    <button onClick={() => deleteProduct(cartItem.productId)}>
                                                        Удалить
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-4">${(cartItem.productPrice * cartItem.quantity).toFixed(2)}</td>
                                        </tr>
                                        </tbody>
                                    )
                                })}
                            </table>
                        </div>
                    </div>
                    <div className="md:w-1/4">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold mb-4">Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>${(totalPrice).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Taxes</span>
                                <span>$1.99</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Shipping</span>
                                <span>$0.00</span>
                            </div>
                            <hr className="my-2"/>
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">Total</span>
                                <span className="font-semibold">${(Number((totalPrice).toFixed(2)) + 1.99).toFixed(2)}</span>
                            </div>
                            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}