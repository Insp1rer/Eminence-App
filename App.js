import React from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./src/navigation";

import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
      {/* <HomeScreen /> */}
      {/* <RestaurantDetailsScreen /> */}
      {/* <DishDetailsScreen /> */}
      {/* <Basket /> */}
      {/* <OrdersScreen /> */}
      {/* <OrderDetails /> */}
      <StatusBar style="Light" />
    </NavigationContainer>
  );
}
