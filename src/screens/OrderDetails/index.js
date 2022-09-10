import { Image, Text, View, FlatList, ActivityIndicator } from "react-native";
import styles from "./styles";
import BasketDishItem from "../../components/BasketDishItem";
import { useOrderContext } from "../../context/OrderContext";
import {useEffect, useState} from 'react';

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

const OrderDetails = ({id}) => {

  const [order, setOrder] = useState();
  const {getOrder} = useOrderContext();

  useEffect(() => {
    getOrder(id).then(setOrder)  
  }, [])

  if (!order) {
    return <ActivityIndicator color="gray" size={"large"} />;
  }
  
  return (
    <FlatList
      ListHeaderComponent={() => <OrderDetailsHeader order={order} />}
      data={order.dishes}
      renderItem={({ item }) => <BasketDishItem basketDish={item} />}
    />
  );
};

export default OrderDetails;
