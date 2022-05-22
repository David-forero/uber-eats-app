import { Text, View, Image, FlatList } from "react-native";
import React from "react";
import restaurants from "../../../assets/data/restaurants.json";
import styles from './styles';


const restaurant = restaurants[0];

const RestaurantDetailsPage = () => {
  return (
    <View style={styles.page}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />

      <View style={styles.container}>
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.subtitle}>
          ${restaurant.deliveryFee} &#8226; {restaurant.minDeliveryTime}-
          {restaurant.maxDeliveryTime} minutes
        </Text>

        <Text style={styles.menuTile}>Menu</Text>
      </View>
    </View>
  );
};

export default RestaurantDetailsPage;