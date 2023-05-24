import { View, Text, StyleSheet, FlatList } from "react-native";
import { BasketDish, Dish, Restaurant } from "../../models";
import { DataStore, Predicates } from "aws-amplify";
import { useEffect, useState } from "react";

const BasketDishItem = ({ basketDish }) => {
  console.log(basketDish);

  const [data, setData] = useState();
  useEffect(() => {
    DataStore.query(Dish, (dish) =>
      dish.id.eq(basketDish.basketDishDishId)
    ).then((result) => {
      if (result.length > 0) {
        setData(result[0]);
      }
    });
  }, [basketDish]);

  console.log(data);

  return (
    <View style={styles.row}>
      <View style={styles.quantityContainer}>
        <Text>{basketDish.quantity}</Text>
      </View>
      {data ? (
        <>
          <Text style={{ fontWeight: "600" }}>{data.name}</Text>
          <Text style={{ marginLeft: "auto" }}>UAH {data.price}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 1,
  },
  quantityContainer: {
    backgroundColor: "lightgrey",
    paddingHorizontal: 5,
    marginRight: 8,
    paddingVertical: 2,
    borderRadius: 3,
  },
});

export default BasketDishItem;
