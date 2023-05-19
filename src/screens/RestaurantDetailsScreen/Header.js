import { View, Text, Image } from "react-native";
import styles from "./styles";

const DEFAULT_IMAGE =
  "https://i1.sndcdn.com/artworks-t0IcWquSmAcde5YI-Mlqztw-t500x500.jpg";

const RestaurantHeader = ({ restaurant }) => {
  return (
    <View style={styles.page}>
      <Image
        source={{
          uri: restaurant.image.startsWith("http")
            ? restaurant.image
            : DEFAULT_IMAGE,
        }}
        style={styles.image}
      />

      <View style={styles.container}>
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.subtitle}>
          {restaurant.deliveryFee.toFixed(1)} UAH &#8226;
          {restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime} хвилин
        </Text>
        <Text style={styles.menuTitle}>Меню</Text>
      </View>
    </View>
  );
};

export default RestaurantHeader;
