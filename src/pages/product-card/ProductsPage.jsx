import {useEffect, useState} from "react";
import axios from "axios";
import {Card} from "./Card.jsx";
import {Pagination} from "../../components/Pagination.jsx";


export function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);


    useEffect(() => {
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
                'x-rapidapi-key': '2c7c76cd46mshabdfdfd21782e44p13bc75jsne87362efad87',
                'x-rapidapi-host': 'real-time-product-search.p.rapidapi.com'
            }
        })
            .then(response => {
                setProducts(response.data.data.products);
            })

    }, [page])



    return (
        <div className="flex flex-col gap-16 items-center">
            <div className="flex flex-wrap justify-center items-center gap-8 mt-16">
                {products.map(product => (
                    <Card
                        id={product.product_id}
                        picture={product.product_photos[0]}
                        title={product.product_title}
                        description={product.product_description}
                        productCost={product.offer.price}
                    />
                ))}
            </div>
            <Pagination/>
        </div>
    )

}
