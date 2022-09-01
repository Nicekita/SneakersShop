function DrawerEmpty (props) {
    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
                    <img className="mb-20" width={120} height={120} src="img/empty-cart.jpg" alt="emptyCart" />
                    <h2>Корзина пустая</h2>
                    <p className="opacity-6 align-center"> Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                    <button onClick={props.onClose} className="greenButton">
                        <img src="img/arrow.svg" alt="Arrow" />
                        Вернуться назад
                    </button>
                </div>
    );
}

export default DrawerEmpty;