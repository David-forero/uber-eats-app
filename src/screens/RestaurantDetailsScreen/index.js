import {
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
  Text,
} from "react-native";
import React from "react";
import DishListItem from "../../components/DishListItem";
import Header from "./Header";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Restaurant, Dish } from "../../models";
import { useBasketContext } from "../../context/BasketContext";

const RestaurantDetailsScreen = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);

  const route = useRoute();
  const navigation = useNavigation();

  const id = route.params?.id;

  const { setRestaurant: setBasketRestaurant, basket, basketDishes } = useBasketContext();

  useEffect(() => {
    if (!id) {
      return;
    }
    setBasketRestaurant(null);
    //Traer por id el restaurante
    DataStore.query(Restaurant, id).then(setRestaurant);

    //Trae todo los platos por el id del restaurante relacionado
    DataStore.query(Dish, (dish) => dish.restaurantID("eq", id)).then(
      setDishes
    );
  }, [id]);

  useEffect(() => {
    setBasketRestaurant(restaurant);
  }, [restaurant]);

  if (!restaurant) {
    return (
      <ActivityIndicator
        style={{ marginTop: 100 }}
        size={"large"}
        color={"black"}
      />
    );
  }

  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <Header restaurant={restaurant} />}
        data={dishes}
        renderItem={({ item }) => <DishListItem dish={item} />}
        keyExtractor={(item) => item.id}
      />

      <Ionicons
        onPress={() => navigation.goBack()}
        name="arrow-back-circle"
        size={45}
        color="white"
        style={styles.iconContainer}
      />

      {basket && (
        <Pressable
          onPress={() => navigation.navigate("Basket")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Open basket {basketDishes.length}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RestaurantDetailsScreen;
