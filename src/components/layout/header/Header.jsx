import { Logo } from './icons/logo.jsx'
import {Link} from "react-router-dom";

export function Header() {
    return (
        <header className="h-20 bg-slate-600 flex items-center">
            <Logo/>
            <div className="h-20 flex items-center justify-around text-xl ml-32 gap-10 text-white">
                <Link to="/">Товары</Link>
                <Link to="/my-cart">Корзина</Link>
            </div>
        </header>
    )
}