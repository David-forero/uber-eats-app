import { StyleSheet, Text, View, FlatList } from "react-native";

// import restaurants from "../../../assets/data/restaurants.json";
// const restaurant = restaurants[0];

const BasketDishItem = ({basketDish}) => {
    return (
      <View style={styles.row}>
        <View style={styles.quantityContainer}>
          <Text>{basketDish.quantity}</Text>
        </View>

        <Text style={{ fontWeight: "600" }}>{basketDish.Dish?.name}</Text>

        <Text style={{ marginLeft: "auto" }}>${basketDish.Dish?.price}</Text>
      </View>
    );
  };

export default BasketDishItem

const styles = StyleSheet.create({

    row: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 15,
      paddingHorizontal: 10
    },

    quantityContainer: {
      backgroundColor: "lightgray",
      paddingHorizontal: 5,
      marginRight: 10,
      paddingRight: 5,
      borderRadius: 3,
    },
  });