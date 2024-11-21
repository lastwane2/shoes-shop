import './App.css'
import {Route, Routes} from "react-router-dom";
import {Layout} from "./components/layout/Layout.jsx";
import {Cart} from "./pages/shopping-cart/Cart.jsx";
import {ProductsPage} from "./pages/product-card/ProductsPage.jsx";


function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout/>}>
            <Route path="/" element={<ProductsPage/>} index/>
            <Route path="/my-cart" element={<Cart/>}/>
        </Route>
    </Routes>
  )
}

export default App
