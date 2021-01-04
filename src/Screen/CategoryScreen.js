import React, { Component } from 'react';
import { View, StyleSheet, Text, StatusBar, Image,TouchableOpacity } from 'react-native';
import { _widthScale, _heightScale, WIDTH_DIMENSION } from '../Constant/Scale';
import { GREY_OPACITY, BASE_COLOR } from '../Constant/Color';
import { ScrollView } from 'react-native-gesture-handler';

import { getAllCategory, getAllProductByCategoryName } from '../Services/api';
import { handleApi } from '../Services/utils'

class CategoryScreen extends Component {
    constructor() {
        super();
        this.state = {
            listCategory: [

            ],
            itemCurrChoice: null
        }
    }

    clickCategory = (item) => {
        this.setState({
            itemCurrChoice: item
        })
    }

    async componentDidMount() {
        let listCategory = await handleApi(getAllCategory());
        console.log(listCategory);

        this.setState({
            listCategory: listCategory.data
        })

    }

    pickItem = async(item) => {

        let listProducts = await handleApi(getAllProductByCategoryName(item.name));
        console.log(listProducts);

        this.props.navigation.navigate('AllProduct', { data: listProducts.data, title: item.name })
    }

    render() {
        return (
            <View style={[styles.container]}>
                <View style={{
                    width: WIDTH_DIMENSION,
                    height: _heightScale(50),
                    backgroundColor: BASE_COLOR,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        color: '#fff',
                        fontWeight: '500',
                        fontSize: _widthScale(18)
                    }}>
                        Danh mục
                    </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={styles.left}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {
                                this.state.listCategory?.length > 0 &&
                                this.state.listCategory.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.clickCategory(item)
                                            }}
                                            activeOpacity={.8}
                                            style={[styles.itemCategory,
                                            this.state.itemCurrChoice?.name == item.name && {
                                                backgroundColor: '#fff'
                                            }
                                            ]}>
                                            {
                                                this.state.itemCurrChoice?.name == item.name &&
                                                <View style={{
                                                    width: _widthScale(5),
                                                    height: "100%",
                                                    backgroundColor: BASE_COLOR,
                                                    position: 'absolute',
                                                    left: 0,

                                                }} />
                                            }
                                            <View style={[styles.styleIconCategory, { marginTop: _heightScale(20) }]}>
                                                <Image
                                                    style={{
                                                        width: "100%",
                                                        height: '100%'
                                                    }}
                                                    source={{ uri: `${item.image}` }}
                                                />
                                            </View>
                                            <Text style={[styles.styleTextCategory, { marginBottom: _heightScale(20) }]}>
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                    <View style={styles.right}>

                        {
                            this.state?.itemCurrChoice?.listChild?.length > 0 &&
                            this.state?.itemCurrChoice?.listChild.map((item, index) => {
                                return (
                                    <View style={{
                                        width: "45%",
                                        height: _widthScale(100),
                                        marginBottom: _heightScale(5),
                                        marginLeft: _widthScale(5),
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.pickItem(item)
                                            }}
                                            style={{ alignItems: 'center' }}>
                                            <View style={{
                                                width: "50%",
                                                height: _widthScale(50),
                                                backgroundColor: '#fff'
                                            }}>
                                                <Image
                                                    style={{
                                                        width: "100%",
                                                        height: '100%'
                                                    }}
                                                    source={{ uri: `${item.image}` }}
                                                />
                                            </View>
                                            <Text style={{
                                                marginTop: _heightScale(5)
                                            }}>
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }

                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'row'
    },
    left: {
        flex: 1.5,
        // backgroundColor: GREY_OPACITY
    },
    right: {
        paddingTop: _heightScale(20),
        flex: 4.5,
        backgroundColor: '#fff',
        marginLeft: _widthScale(5),
        flexDirection: 'row',
        flexWrap: 'wrap',
        // justifyContent:'center'
    },
    itemCategory: {
        backgroundColor: 'rgba(1, 140, 115,.1)',
        marginBottom: _heightScale(1),
        // paddingVertical: _heightScale(30),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: _widthScale(10),
        // height:_widthScale(150)
    },
    styleIconCategory: {
        width: _widthScale(50),
        height: _widthScale(50),
        backgroundColor: '#fff'
    },
    styleTextCategory: {
        textAlign: 'center',
        marginTop: _heightScale(10)
    }
})


export default CategoryScreen;