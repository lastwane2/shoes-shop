import {useStore} from "../../stores/store.js"
import {useState} from "react";



export function Card (props) {


    const addToCard = useStore((state) => state.addToCart)
    console.log(useStore(state => state.cart))

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const disableButton = () => {
        setButtonDisabled(true)
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
                <p className="mt-1 text-gray-500 dark:text-neutral-400 text-ellipsis line-clamp-5">
                    {props.description}
                </p>
                <button
                    disabled={buttonDisabled}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                    onClick={() => {
                        addToCard({
                            key : props.id,
                            name : props.title,
                            image : props.picture,
                            productPrice : props.productCost.slice(1),
                            productId: props.id,
                            quantity: 1
                        });
                        disableButton()
                    }}
                >
                    Добавить в корзину
                </button>

            </div>
        </div>
    )
}