import { Image, Text, View, FlatList, ActivityIndicator } from "react-native";
// import orders from "../../../assets/data/orders.json";
// import restaurants from "../../../assets/data/restaurants.json";
import styles from "./styles";
import BasketDishItem from "../../components/BasketDishItem";
import { useOrderContext } from "../../context/OrderContext";
import {useEffect, useState} from 'react';
import { useRoute } from '@react-navigation/native';
// const order = orders[0];
// const restaurant = restaurants[0];

const OrderDetailsHeader = ({order}) => {
 

  return (
    <View>
      <View style={styles.page}>
        <Image source={{ uri: order.Restaurant.image }} style={styles.image} />

        <View style={styles.container}>
          <Text style={styles.title}>{order.Restaurant.name}</Text>
          <Text style={styles.subtitle}>{order.status} &#8226; 2 days ago</Text>

          <Text style={styles.menuTile}>Your orders</Text>
        </View>
      </View>
    </View>
  );
};

const OrderDetails = () => {

  const [order, setOrder] = useState();
  const {getOrder} = useOrderContext();
  const route = useRoute();
  const id = route.params?.id;


  useEffect(() => {
    getOrder(id).then(setOrder)  
  }, [])

  if (!order) {
    return <ActivityIndicator color="gray" size={"large"} />;
  }
  
  console.log(order);
  
  return (
    <FlatList
      ListHeaderComponent={() => <OrderDetailsHeader order={order} />}
      data={order.dishes}
      renderItem={({ item }) => <BasketDishItem basketDish={item} />}
    />
  );
};

export default OrderDetails;
