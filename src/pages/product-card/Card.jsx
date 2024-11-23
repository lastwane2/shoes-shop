import {useStore} from "../../stores/store.js"

export function Card (props) {


    const addToCard = useStore((state) => state.addToCart)
    const cartData = useStore((state) => state.cart)
    const increaseProductQuantity = useStore((state) => state.increaseQuantity)
    const decreaseProductQuantity = useStore((state) => state.decreaseQuantity)
    const deleteProduct = useStore((state) => state.deleteProduct)

    const currentCardQuantity = () => {
        for (let card of cartData) {
            if (props.id === card.productId) return (card.quantity)
        }
    }
    const currentCardId = () => {
        for (let card of cartData) {
            if (props.id === card.productId) return (card.productId)
        }
    }

    const renderButtons = () => {
        if (cartData.some(elem => elem.productId === currentCardId() ? true : false)) {
            return (
                <div className="flex items-center justify-center gap-2">
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg w-[50%]"
                        onClick={() => {
                            deleteProduct(props.id);
                        }}
                    >
                        В корзине
                    </button>

                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg w-[10%] flex justify-center"
                        onClick={() => decreaseProductQuantity(props.id)}
                    >
                        -
                    </button>
                    <div className="mx-1 text-white">{currentCardQuantity()}</div>
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg w-[10%] flex justify-center"
                        onClick={() => increaseProductQuantity(props.id)}
                    >
                        +
                    </button>
                </div>
            )
        }
        return (
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
                onClick={() => {
                    addToCard({
                        key: props.id,
                        name: props.title,
                        image: props.picture,
                        productPrice: props.productCost.slice(1),
                        productId: props.id,
                        quantity: 1
                    });
                }}
            >
                В корзину
            </button>
        )
    }


    return (
        <div
            key={props.id}
            className="w-64 h-96 flex flex-col bg-slate-600 border shadow-sm rounded-xl justify-between">
            <img className="rounded-t-xl object-cover h-[115px]"
                 src={props.picture}
                 alt="Card Image"/>
            <div className="p-4 md:p-5">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    {props.title}
                </h3>
                <h2>
                    {props.productPrice}
                </h2>
                <p className="mt-1 text-gray-500 dark:text-neutral-400 text-ellipsis line-clamp-5 mb-4">
                {props.description}
                </p>

                {renderButtons()}

            </div>
        </div>
    )
}