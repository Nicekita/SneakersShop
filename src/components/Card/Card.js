import React from 'react';
import styles from './Card.module.scss'
import ContentLoader from "react-content-loader"
import { AppContext } from "../../App";


function Card({
    id,
    title,
    imageUrl,
    price,
    onFavorite,
    onPlus,
    favorited = false,
    loading = false
}) {
    const { isItemAdded } = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    console.log(title, isItemAdded(id));

    const onClickPlus = () => {
        onPlus({ id, title, imageUrl, price });
    };

    const onClickHeart = () => {
        onFavorite({ id, title, imageUrl, price });
        setIsFavorite(!isFavorite);

    };


    return (
        <div className={styles.card}>
            {
                loading ?  <ContentLoader 
                speed={2}
                width={150}
                height={187}
                viewBox="0 0 150 187"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb">
                <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
                <rect x="0" y="124" rx="5" ry="5" width="100" height="15" /> 
                <rect x="0" y="160" rx="5" ry="5" width="80" height="24" /> 
                <rect x="115" y="150" rx="10" ry="10" width="32" height="32" /> 
                <rect x="0" y="100" rx="5" ry="5" width="150" height="15" />
              </ContentLoader> : <>
                <div className={styles.favorite} onClick={onClickHeart}>
                    <img
                        src={isFavorite ? "img/heart-liked.svg" : "img/heart-unliked.svg"}
                        alt="Heart"
                    />
                </div>
                <img width={133} height={112} src={imageUrl} alt="" />
                <h5>{title}</h5>
                <div className="d-flex justify-between align-center">
                    <div className="d-flex flex-column">
                        <span>Цена:</span>
                        <b>{price} руб.</b>
                    </div>
                    <img
                        className={styles.plus}
                        onClick={onClickPlus}
                        src={isItemAdded(id) ? "img/added.svg" : "img/plus.svg"}
                        alt="Plus"
                    />
                </div>
              </>
            }
        </div>
    );
}

export default Card;