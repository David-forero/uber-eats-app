import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";
import restaurants from '../../../assets/data/restaurants.json';
import RestaurantItem from "../../components/RestaurantItem";

export default function HomeScreen() {
  return (
    <View style={styles.page}>
      <FlatList
      data={restaurants}
      renderItem={({item}) => <RestaurantItem restaurant={item}/>}
      showsVerticalScrollIndicator={false}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
  }
});
