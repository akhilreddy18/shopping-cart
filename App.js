import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Dimensions,
  TouchableHighlight,
  ActivityIndicator,
  Text
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import Cart from './Cart';
import Products from './Products';

const App: () => React$Node = () => {

  const [isLoading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [disableCheckout, setCheckout] = useState(false);
  const [checkoutItems, setItems] = useState([]);
  const [selected, setSelected] = useState(0);


  useEffect(() => {
    fetch('https://mock.itsitchy.com/products')
      .then((response) => response.json())
      .then((json) => {
        json.forEach(element => {
          element.clicked = false;
          element.key = element.name;
        });
        setList(json)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const handleCheckout = () => {
    if (selected > 0) {
      const items = list.filter((item) => item.clicked === true);
      const sortedList = list.sort((a, b) => a.clicked > b.clicked)
      setItems(items);
      setList(sortedList);
      setSelected(0)
    }
  }

  const handleDelete = (removeItem) => {
    const items = checkoutItems.filter((item) => item.key != removeItem.key);
    setItems(items);
    const newList = markItem(removeItem.key);
    const sortedList = newList.sort((a, b) => a.clicked > b.clicked)
    setList(sortedList);
  }

  function handleMark(item) {
    if(!checkoutItems.includes(item)){
      const newList = markItem(item.key);
      if (item.clicked === true) setSelected(selected - 1)
      else setSelected(selected + 1)
      const markedList = newList.filter((newItem) => newItem.clicked === true);
      if (markedList.length > 5) setCheckout(true)
      else setCheckout(false)
      setList(newList);
    }
  }

  function markItem(key) {
    return list.map((item) => {
      if (item.key === key) {
        const updatedItem = {
          ...item,
          clicked: !item.clicked,
        };
        return updatedItem;
      }
      return item;
    });
  }

  return (
    <View>
      {isLoading ? <ActivityIndicator /> :
        <View>
          <StatusBar barStyle="light-content" />
          <SafeAreaView>

            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              <Cart data={checkoutItems} handleDelete={handleDelete} selected={checkoutItems.length} />
              <Products list={list} handleMark={handleMark} selected={selected} checkoutItems={checkoutItems}/>
            </ScrollView>

            <View style={styles.button}>
              <TouchableHighlight
                style={styles.touchableHighlight}
                disabled={disableCheckout}
                onPress={handleCheckout}
                underlayColor='#fff'
              >
                <View style={{
                  backgroundColor: disableCheckout ? "#808080" : "#0483DC",
                  alignItems: "center", padding: 15,
                  borderRadius: 15
                }}>
                  <Text style={styles.cartText}>Add to cart</Text>
                </View>
              </TouchableHighlight>
            </View>
            
          </SafeAreaView>
        </View>
      }
    </View>
  );
};

const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
    height: 0.87 * screenHeight,
  },
  button: {
    padding: 10,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 30
  },
  touchableHighlight: {
    paddingLeft: 10,
    paddingRight: 10
  },
  cartText: {
    paddingLeft: 0,
    color: Colors.white,
    fontSize: 16,
    fontWeight: "400"
  }
});

export default App;
