import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React, { useState } from 'react'
import { DataStore } from 'aws-amplify';
import { Courier, Order } from '../../models';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRef, useEffect } from 'react';

const OrderLivesUpdates = ({ id }) => {

  const [order, setOrder] = useState(null);
  const [courier, setCourier] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    DataStore.query(Order, id).then(setOrder);
  }, [])

  useEffect(() => {
    if (!order) {
      return;
    }

    const subscription = DataStore.observe(Order, order.id).subscribe((msg) => {
      if (msg.opType === "UPDATE") {
        setOrder(msg.element);
      }
    })

    return () => subscription.unsubscribe();
  }, [order])
  

  useEffect(() => {
    console.log('delivery 🛵', order?.orderCourierId);
    if (order?.orderCourierId) {
      DataStore.query(Courier, order.orderCourierId).then(setCourier);
    }
  }, [order?.orderCourierId])

  useEffect(() => {
    if (courier?.lng && courier?.lat) {
      console.log('mi delivery 🛵');
      mapRef.current.animateToRegion({
        latitude: courier?.lat,
        longitude: courier?.lng,
        latitudeDelta: 0.007,
        longitudeDelta: 0.007
      })
    }
  }, [courier?.lng, courier?.lat]);

  useEffect(() => {
    if (!courier) {
      return;
    }

    const subcription = DataStore.observe(Courier, courier.id).subscribe((msg) => {
      if (msg.opType === "UPDATE") {
        setCourier(msg.element)
      }
    });

    return () => subcription.unsubscribe();
  }, [courier])


  return (
    <View>
      <MapView
        style={styles.map}
        ref={mapRef}
        showsUserLocation
      >
        {
          courier?.lat && <Marker
            coordinates={{ latitude: courier.lat, longitude: courier.lng }}
          >
            <View style={{ padding: 5, backgroundColor: 'green', borderRadius: 40, borderWidth: 1, borderColor: 'white' }}>
              <FontAwesome5 name="motorcycle" size={24} color="white" />
            </View>
          </Marker>
        }
      </MapView>
    </View>
  )
}

export default OrderLivesUpdates

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%'
  }
})