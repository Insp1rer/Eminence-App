import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";

const RestaurantItem = ({ restaurant }) => {
  const onPress = () => {
    console.warn("pressed");
  };
  return (
    <Pressable onPress={onPress} style={styles.restaurantContainer}>
      <Image
        source={{
          uri: restaurant.image,
        }}
        style={styles.image}
      />
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>{restaurant.name}</Text>
          <Text style={styles.subtitle}>
            ${restaurant.deliveryFee} &#8226; {restaurant.minDeliveryTime}-
            {restaurant.maxDeliveryTime} хвилин
          </Text>
        </View>

        <View style={styles.rating}>
          <Text>{restaurant.rating}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default RestaurantItem;

const styles = StyleSheet.create({
  restaurantContainer: {
    width: "100%",
  },
  image: {
    width: "100%",
    aspectRatio: 5 / 3,
    borderRadius: 6,
    marginTop: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 6,
  },
  subtitle: {
    color: "grey",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: "auto",
    backgroundColor: "lightgray",
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
