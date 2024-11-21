import {Header} from "./header/Header.jsx";
import {Outlet} from "react-router-dom";

export function Layout() {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}