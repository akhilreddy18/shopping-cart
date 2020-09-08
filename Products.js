import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableHighlight,
    Dimensions
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';

import {
    Colors
} from 'react-native/Libraries/NewAppScreen';

const Products = (props) => {
    let color;
    return (
        <View style={styles.body}>

            <View style={{ paddingLeft: 25 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Products</Text>
                <Text>Selected: {props.selected}</Text>
            </View>

            <View style={styles.sectionContainer}>
                <FlatList
                    data={props.list}
                    scrollEnabled={false}
                    renderItem={({ item }) =>

                        <TouchableHighlight
                            style={styles.button}
                            underlayColor={"#fff"}
                            onPress={() => props.handleMark(item)}
                        >
                            <View style={{
                                flex: 1, flexDirection: 'row',
                                backgroundColor: props.checkoutItems.includes(item) ? '#F8F8F8' : '#DBE6FF',
                                marginBottom: 5,
                                marginTop: 5,
                                justifyContent: 'space-between',
                                borderRadius: 10
                            }}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'column'
                                }}>
                                    <Text style={styles.item}>{item.key}</Text>
                                    <Text style={{
                                        paddingLeft: 20,
                                        paddingBottom: 10
                                    }}>{item.price} kr</Text>
                                </View>
                                <View style={{
                                    paddingRight: 10,
                                    paddingTop: 25
                                }}>
                                    <FontAwesomeIcon
                                        icon={item.clicked ? faCheckCircle : faCircle}
                                        size={30}
                                        color={getColor(props, item)} />
                                </View>
                            </View>

                        </TouchableHighlight>
                    }
                />
            </View>
        </View>
    );
};

function getColor(props, item) {
    if (props.checkoutItems.includes(item)) {
        return '#cce0ff'
    } else if (item.clicked) {
        return '#0483DC'
    } else {
        return '#fff'
    }
}

const screenHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    body: {
        backgroundColor: Colors.white,
        paddingBottom: 30,
        paddingTop: 20
    },
    sectionContainer: {
        paddingHorizontal: 24,
        paddingTop: 10
    },
    button: {
        backgroundColor: Colors.blue,
        color: Colors.black
    },
    item: {
        padding: 15,
        fontSize: 18,
        height: 60,
        paddingLeft: 20
    },
    touchable: {
        flex: 1, flexDirection: 'row',
        backgroundColor: '#DBE6FF',
        marginBottom: 5,
        marginTop: 5,
        justifyContent: 'space-between',
        borderRadius: 10
    }
});

export default Products;