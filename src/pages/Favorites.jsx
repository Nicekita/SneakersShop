import React from "react";
import Card from "../components/Card/Card";
import { AppContext } from "../App";
import { Link } from 'react-router-dom';

function Favorites () { 
  const {favorite, onAddToFavorite} = React.useContext(AppContext)
    return (
        <div className="content p-40">
          {
            favorite.length > 0 ? (
              <>
              <div className="d-flex align-center justify-between mb-40" >
                <h1>Мои закладки</h1>
              </div>
              <div className="d-flex flex-wrap">
                {favorite
                    .map((item,index) => (
                      <Card
                        key={index}
                        favorited={true}
                        onFavorite={onAddToFavorite}
                        {...item}
                      />
                  ))}
              </div>
              </>
            ) : (
              <div className="empty-favorites">
                <img src="/img/empty-favorites.png" alt="картинка" />
                <h1 className="title-empty">Закладок нет :(</h1>
                <p className="description-empty">Вы ничего не добавляли в закладки</p>
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
      
    );
}

export default Favorites;