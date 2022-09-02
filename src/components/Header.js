import React from 'react';
import { useCart } from "../hooks/useCart";
import { Link } from 'react-router-dom';

function Header(props) {

    const { totalPrice } = useCart(); 

    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to="/">
                <div className="d-flex align-center">
                    <img src="/img/logo.png" width={40} height={40} className="cu-p" alt='Логотип' />

                    <div>
                        <h3 className="text-uppercase">Sneakers Shop</h3>
                        <p className="opacity-5">Магазин лучших кросовок</p>
                    </div>
                </div>
            </Link>
            <div>
                <ul className="d-flex">
                    <li onClick={props.onClickCart} className="mr-30 cu-p">
                        <img src="/img/cart.svg" width={18} height={18} alt="Корзина" />
                        <span>{totalPrice} руб.</span>
                    </li>
                    <li className="mr-30 cu-p">
                        <Link to="/favorites">
                            <img src="/img/favorite.svg" width={18} height={18} alt="Закладки" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders">
                        <img src="/img/user.svg" width={18} height={18} alt="Пользователь" />
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;






