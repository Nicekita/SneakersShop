import React from "react";
import { Outlet } from "react-router-dom";
import Drawer from "./Drawer/Drawer";
import Header from "./Header";
import { AppContext } from "../App";

function Layout({  cartItems, onRemoveItem }) {

    const {drawerOpened, setDrawerOpened} = React.useContext(AppContext)

    return (
        <div className="wrapper clear">
            {drawerOpened && <Drawer items={cartItems} onRemove={onRemoveItem} onCloseCart={() => setDrawerOpened(false)} />}
            <Header onClickCart={() => setDrawerOpened(true)} />

            <Outlet />

        </div>
    );
}

export default Layout;