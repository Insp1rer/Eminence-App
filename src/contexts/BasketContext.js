import { createContext, useState, useEffect, useContext } from "react";
import { DataStore } from "aws-amplify";
import { Basket, BasketDish, Dish } from "../models";
import { useAuthContext } from "./AuthContext";

const BasketContext = createContext({});

const BasketContextProvider = ({ children }) => {
  const { dbUser } = useAuthContext();

  const [restaurant, setRestaurant] = useState(null);
  const [basket, setBasket] = useState(null);
  const [basketDishes, setBasketDishes] = useState([]);
  const [data] = useState([]);

  const totalPrice = data.reduce(
    (sum, basketDish, data) => sum + data.price * basketDish.quantity,
    restaurant?.deliveryFee
  );

  //console.log(dbUser);
  //console.log(typeof totalPrice);
  // console.log(restaurant);

  useEffect(() => {
    DataStore.query(
      Basket,
      (basket) =>
        basket.userID.eq(Object(dbUser).id) &&
        basket.restaurantID.eq(Object(restaurant).id)
    ).then((baskets) => setBasket(baskets[0]));
  }, [restaurant, dbUser]);

  // useEffect(() => {
  //   DataStore.query(BasketDish, (basketDish) =>
  //     basketDish.basketID.eq(Basket.id)
  //   ).apply(setBasket(this));
  // }, [Basket]);

  useEffect(() => {
    if (basket) {
      DataStore.query(BasketDish, (bd) => bd.basketID.eq(basket.id)).then(
        setBasketDishes
      );
    }
  }, [basket]);

  const addDishToBasket = async (dish, quantity) => {
    let theBasket = basket || (await createNewBasket());

    const newDish = await DataStore.save(
      new BasketDish({ quantity, Dish: dish, basketID: theBasket.id })
    );

    setBasketDishes([...basketDishes, newDish]);
  };

  const createNewBasket = async () => {
    const newBasket = await DataStore.save(
      new Basket({ userID: dbUser.id, restaurantID: restaurant.id })
    );
    setBasket(newBasket);
    return newBasket;
  };

  return (
    <BasketContext.Provider
      value={{
        addDishToBasket,
        setRestaurant,
        restaurant,
        basket,
        basketDishes,
        totalPrice,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
