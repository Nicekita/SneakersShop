import React from "react";
import Card from "../components/Card/Card";
import axios from "axios";
import { Link } from 'react-router-dom';


function Orders () {

    const [orders, setOrders] = React.useState([]);

    React.useEffect(()=>{
        (async () => {
            const { data } = await axios.get('https://62f4dbd3535c0c50e763e5af.mockapi.io/orders');
            setOrders(data);
        })();
    }, []);

    return (
        <div className="content p-40">
            {
                orders.length > 0 ? (
                    <>
                        <div className="d-flex align-center justify-between mb-40" >
                <h1>Мои покупки</h1>
            </div>
        
            {orders.map((item) => {
                return (
                    <>
                        <h2>Заказ №{item.id}</h2>
                        <div className="d-flex flex-wrap">
                            {
                                item.items.map((item,index) => (
                                    <Card
                                        key={index}
                                        {...item}
                                    />
                                ))
                            }
                        </div>
                    </>
                )})}
                    </>
                ) : (
                    <div className="empty-favorites">
                <img src="/img/empty-orders.png" alt="картинка" />
                <h1 className="title-empty">Заказов нет :(</h1>
                <p className="description-empty">Вы не сделали ни один заказ</p>
                <Link to="/">
                  <button className="greenButton">
                    <img src="/img/arrow.svg" alt="Arrow" />
                    Вернуться назад
                  </button>
                </Link>
              </div>
                )
            }
        </div>
    )
}

export default Orders


