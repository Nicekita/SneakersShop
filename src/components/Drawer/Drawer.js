import React from "react";
import Info from "../Info";
import axios from "axios";
import { useCart } from "../../hooks/useCart";

const delay = () => new Promise((resolve) => setTimeout(resolve, 1000))

function Drawer({ onCloseCart, onRemove, items = [] }) {
    const {cartItems, setCartItems, totalPrice} = useCart();
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    let isLoading = false;
    const [isLoading, setIsLoading] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const nalogPrice = Math.ceil(totalPrice / 100 * 5);

    const onClickOrder = async () => {
       try {
           isLoading = true;
        setIsLoading(true)
        const {data} = await axios.post('https://62f4dbd3535c0c50e763e5af.mockapi.io/orders', {items: cartItems});
        setOrderId(data.id);
        setIsOrderComplete(true);
        setCartItems([]);

        for (let i = 0; i < cartItems.length; i++) {
            const item = cartItems[i];
            await axios.delete('https://62f4dbd3535c0c50e763e5af.mockapi.io/cart/' + item.id);
            await delay();
           }
       } catch (error) {
        alert('Не удалось отправить заказ в курьерскую доставку')
       }
       setIsLoading(false)
    }

    return (
        <div className="overlay" >
            <div className="drawer">
                <h2 className="d-flex justify-between mb-30">Корзина<img onClick={onCloseCart} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="" />
                </h2>

                {
                    items.length > 0 ? (
                        <div className="d-flex flex-column flex">
                            <div className="items">
                                {items.map((obj) => (
                                    <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                        <div style={{ backgroundImage: `url(${obj.imageUrl})` }}
                                            className="cartItemImg">
                                        </div>
                                        <div className="mr-20 flex">
                                            <p className="mb-5">{obj.title}</p>
                                            <b>{obj.price} руб.</b>
                                        </div>
                                        <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
                                    </div>
                                ))}
                            </div>
                            <div className="cartTotalBlock">
                                <ul className="">
                                    <li className="d-flex">
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>{totalPrice} руб.</b>
                                    </li>
                                    <li className="d-flex">
                                        <span>Налог 5%</span>
                                        <div></div>
                                        <b>{nalogPrice} руб.</b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} onClick={onClickOrder}  className="greenButton">
                                    Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
                                </button>
                            </div>
                        </div>
                    ) : (
                    <Info
                        title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                        descriptoin={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"}
                        image={isOrderComplete ? "/img/Ordered.jpg" :"/img/empty-cart.jpg"}
                    />
                    )
                }


            </div>
        </div>
    );
}

export default Drawer;
