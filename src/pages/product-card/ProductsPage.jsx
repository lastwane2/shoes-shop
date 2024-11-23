import {useEffect, useState} from "react";
import {Card} from "./Card.jsx";
import {Loader} from "../../components/loader.jsx";
import {useStore} from "../../stores/productsData.js"
import axios from "axios";


export function ProductsPage() {
    const [page, setPage] = useState(1);

    const [isLoading, setIsLoading] = useState(false)

    const products = useStore((state) => state.productsOnPage);
    const loadProducts = useStore((state) => state.loadProducts);

    const dataFetched = useStore((state) => state.dataFetched)
    const setDataFetched = useStore((state) => state.setDataFetched)


    useEffect(() => {
        if(!dataFetched){
            setIsLoading(true)
            axios.get("https://real-time-product-search.p.rapidapi.com/search-v2", {
                params: {
                    q: 'Nike shoes',
                    country: 'us',
                    language: 'en',
                    page: page,
                    limit: '10',
                    sort_by: 'BEST_MATCH',
                    product_condition: 'ANY'
                },
                headers: {
                    'x-rapidapi-key': '61dc9795a4msh471bac6aa8870d9p112e5ajsne47a1b94af0d',
                    'x-rapidapi-host': 'real-time-product-search.p.rapidapi.com'
                }
            })
                .then(response => {
                    const productsCopy = [...response.data.data.products];
                    loadProducts(productsCopy);
                    setDataFetched(true)
                    setIsLoading(false)
                })
        }
    }, [page])


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[500px]">
                <Loader/>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-16 items-center">
                <div className="flex flex-wrap justify-center items-center gap-8 mt-16">
                    {products.map(product => (
                        <Card
                            key={product.product_id}
                            id={product.product_id}
                            picture={product.product_photos[0]}
                            title={product.product_title}
                            description={product.product_description}
                            productCost={product.offer.price}
                        />
                    ))}
                </div>
            <div className="flex">
                <button
                    onClick={() => {
                        setPage(prevPage => prevPage > 1 ? prevPage - 1 : prevPage);
                        setDataFetched(false)
                    }}
                    className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Previous
                </button>
                <h1></h1>
                <button
                    onClick={() => {
                        setPage(prevPage => prevPage < 50 ? prevPage + 1 : prevPage);
                        setDataFetched(false)
                    }}
                    className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Next
                </button>
            </div>
        </div>
    )

}
