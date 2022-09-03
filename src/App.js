import React from "react";
import { Route, Routes } from 'react-router-dom';
import axios from "axios";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorite, setFavotite] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [drawerOpened, setDrawerOpened] = React.useState(false);
  

  React.useEffect(() => {
   async function fetchData() {
    try {
      const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
        await axios.get('https://62f4dbd3535c0c50e763e5af.mockapi.io/cart'),
        await axios.get('https://62f4dbd3535c0c50e763e5af.mockapi.io/favorites'),
        await axios.get('https://62f4dbd3535c0c50e763e5af.mockapi.io/Items'),
      ]); 
      
      setIsLoading(false);
      setItems(itemsResponse.data);
      setCartItems(cartResponse.data);
      setFavotite(favoritesResponse.data);
    } catch (error) {
      alert('Ошибка при запросе данных');
    }
   }

   fetchData();
  }, []);

  const onAddToCart = (obj) => {
     if (cartItems.find(res => res.parentId === obj.id )) {
      axios.delete(`https://62f4dbd3535c0c50e763e5af.mockapi.io/cart/${obj.id}`)
      setCartItems(prev => prev.filter(item => item.parentId !== obj.id))
     }
     else {
      axios.post('https://62f4dbd3535c0c50e763e5af.mockapi.io/cart', obj);
      setCartItems(prev => [...prev, obj])
     }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://62f4dbd3535c0c50e763e5af.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id));
  }

  const onAddToFavorite = async (obj) => {
   try {
    if (favorite.find(res => res.id === obj.id )) {
      axios.delete(`https://62f4dbd3535c0c50e763e5af.mockapi.io/favorites/${obj.id}`)
      setFavotite(prev => prev.filter(item => item.id !== obj.id))
    }
    else {
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

  return (
    <AppContext.Provider value={{
      items,
      cartItems,
      favorite,
      isItemAdded,
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
          <Home
            cartItems={cartItems}
            items={items}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading = {isLoading}
          />}
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
