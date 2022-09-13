import React from "react";
import { Route, Routes } from 'react-router-dom';
import axios from "axios";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import Slider from "./components/Slider/Slider";
import Pagination from "./components/Pagination";



export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = React.useState([]);
  const [fullItems, setFullItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorite, setFavotite] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [drawerOpened, setDrawerOpened] = React.useState(false);
  

  React.useEffect(() => {
   async function fetchData() {
    try {
      const [cartResponse, favoritesResponse, itemsResponse, fullItemsResponse] = await Promise.all([
        await axios.get('https://62f4dbd3535c0c50e763e5af.mockapi.io/cart'),
        await axios.get('https://62f4dbd3535c0c50e763e5af.mockapi.io/favorites'),
        await axios.get('https://62f4dbd3535c0c50e763e5af.mockapi.io/Items?page=1&limit=8'),
        await axios.get('https://62f4dbd3535c0c50e763e5af.mockapi.io/Items')
      ]); 
      
      
      setIsLoading(false);
      setItems(itemsResponse.data);
      setCartItems(cartResponse.data);
      setFavotite(favoritesResponse.data);
      setFullItems(fullItemsResponse.data)
    } catch (error) {
      alert('Ошибка при запросе данных');
    }
   }

   fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(res => res.parentId === obj.id);
      if (findItem) {
        setCartItems(prev => prev.filter(item => item.parentId !== obj.id))
        await axios.delete(`https://62f4dbd3535c0c50e763e5af.mockapi.io/cart/${findItem.id}`)
        
      }
      else {
        setCartItems(prev => [...prev, obj]);
        const { data } = await axios.post('https://62f4dbd3535c0c50e763e5af.mockapi.io/cart', obj);
        setCartItems(prev => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            };
          }
          return item;
        }));
      }
    } catch (error) {
      alert ('Не удалось добавить товар в корзину')
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://62f4dbd3535c0c50e763e5af.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
  }

  const onAddToFavorite = async (obj) => {
   try {
    const findItem = favorite.find(res => res.title === obj.title);
    if (findItem) {
      console.log('Проверка прошла, удаляю')
      setFavotite(prev => prev.filter(item => item.title !== obj.title))
      axios.delete(`https://62f4dbd3535c0c50e763e5af.mockapi.io/favorites/${findItem.id}`)
    }
    else {
      console.log('Проверка не прошла, создаю')
      const { data } = await axios.post('https://62f4dbd3535c0c50e763e5af.mockapi.io/favorites', obj);
      setFavotite(prev => [...prev, data])
    }
   }
   catch(error) {
    alert ('Не удалось добавить в фавориты');
   }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => obj.parentId === id)
  };

  const isFavoriteAdded = (id) => {
    return favorite.some((obj) => obj.parentId === id)
  };


  return (
    <AppContext.Provider value={{
      items,
      setItems,
      fullItems,
      cartItems,
      favorite,
      isItemAdded,
      isFavoriteAdded,
      onAddToFavorite,
      drawerOpened,
      setDrawerOpened,
      setCartItems
      }}>
      <Routes>
        <Route path="/" element={
            <Layout
              cartItems={cartItems}
              onRemoveItem={onRemoveItem}
            />}
          >
          <Route index element={
              <>
                <Slider infinite children={
                  <> 
                  <img className="item item-1" alt="Рекламная акция" src="/img/1c.jpg"/>
                  <img className="item item-1" alt="Рекламная акция" src="/img/2c.jpg"/>
                  <img className="item item-1" alt="Рекламная акция" src="/img/3c.jpg"/>
                  </>
                  }
                />
                <Home
                  cartItems={cartItems}
                  items={items}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  onChangeSearchInput={onChangeSearchInput}
                  onAddToFavorite={onAddToFavorite}
                  onAddToCart={onAddToCart}
                  isLoading = {isLoading}
                />
                <Pagination/>
              </>
            }
          />
          <Route path="/favorites" exact element={
            <Favorites/>}
          />
          <Route path="/orders" exact element={
            <Orders/>}
          />
        </Route>
    </Routes>
    </AppContext.Provider>
  );
}

export default App;
