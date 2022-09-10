import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OrderDetails from '../screens/OrderDetails';
import OrderLivesUpdates from '../screens/OrderLivesUpdates';
const Tab = createMaterialTopTabNavigator();

const OrderDetailsNavigator = ({ route }) => {

    const id = route?.params?.id;

    return (
        <Tab.Navigator>
            <Tab.Screen name="Details">
                { ()=> <OrderDetails id={id} />}
            </Tab.Screen>
            <Tab.Screen name="Updates">
                { ()=> <OrderLivesUpdates id={id} />}
            </Tab.Screen>
        </Tab.Navigator>
    )
}

export default OrderDetailsNavigator