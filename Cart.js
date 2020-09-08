import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const Cart = (props) => {
  return (
    <View style={styles.headerStyle}>
      <Text style={{ fontSize: 18, fontWeight: "bold", paddingBottom: 20 }}>Shopping Cart</Text>
      <View style={{ paddingRight: 10 }}>
        <Text style={{ paddingBottom: 5 }}>Items {props.selected}/5</Text>
        <ProgressBar progress={props.selected / 5} color="#0483DC" style={{ height: 14, borderRadius: 5 }} />
      </View>

      <FlatList
        data={props.data}
        renderItem={({ item }) =>
          <View style={styles.cartItems}>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text>{item.key}</Text>
              <Text>{item.price}</Text>
            </View>
            <TouchableOpacity
              onPress={() => props.handleDelete(item)}
            >
              <View style={{ paddingRight: 20 }}>
                <Text style={styles.deleteButton}>Delete</Text>
              </View>
            </TouchableOpacity>
          </View>
        } />
    </View>
  );
};

const styles = {
  headerStyle: {
    flex: 0.4,
    elevation: 5,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 5
  },
  cartItems: {
    flex: 1, 
    flexDirection: 'row', 
    marginTop: 10, 
    justifyContent: 'space-between'
  },
  deleteButton: { 
    textDecorationLine: "underline", 
    paddingTop: 10, 
    color: "#D11A2A" }
};

export default Cart;