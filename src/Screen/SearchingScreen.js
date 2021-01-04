import React, { Component } from 'react';
import { View, StyleSheet, Text, StatusBar, Image, FlatList,TouchableOpacity } from 'react-native';
import { _widthScale, _heightScale, WIDTH_DIMENSION } from '../Constant/Scale';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { BASE_COLOR, GREY_OPACITY } from '../Constant/Color';
import Icon from 'react-native-vector-icons/FontAwesome';
// var _ = require('lodash');
import _ from 'lodash'
import { findProduct } from '../Services/api';
import { handleApi } from '../Services/utils'

class SearchingScreen extends Component {
    constructor() {
        super();
        this.onChangeTextDelayed = _.debounce(this.onChangeText, 500);
        this.state = {
            listProducts: []
        }
    }

    onChangeText = async (text) => {
        let listProductsFetch = await handleApi(findProduct(text))
        this.setState({
            listProducts: listProductsFetch.data
        },()=>{
            console.log(this.state.listProducts);
            
        })
        // console.log({ listProducts });
        // this.setState({
        //     listProducts: listProducts.data
        // },()=>{
        //     console.log(this.state.listProducts);

        // })
    }


    _renderItem = ({ item, index }) => {

        return (
            <View style={[styles.item,
            index % 2 == 0 ? { borderRightColor: '#fff', borderBottomColor: '#fff' }
                : { borderBottomColor: '#fff' },
            (index == [1,2].length - 1 || index == [1,2].length - 2) && { borderBottomColor: 'rgba(182, 184, 182,0.4)' }
            ]}>
                <TouchableOpacity
                    onPress={() => {
                        if (this.props.reload == true) {
                            this.props.navigation.goBack()
                            this.props.navigation.navigate('InfoProduct')
                        } else {
                            this.props.navigation.navigate('InfoProduct', { idProduct: item?.data?.id })
                        }
                    }}
                    activeOpacity={0.8}
                >
                    {
                        item.data.newPrice &&
                        <View style={{
                            width: _widthScale(60),
                            height: _heightScale(20),
                            backgroundColor: '#FF424E',
                            position: 'absolute',
                            borderRadius: _widthScale(5),
                            zIndex: 10,
                            top: _heightScale(5),
                            left: _widthScale(5),
                            justifyContent: 'center'
                        }}>
                            <Text style={{
                                color: '#fff',
                                alignSelf: 'center',
                                fontSize: _widthScale(13),
                                fontWeight: '500'
                            }}>
                                {
                                    `- ${parseInt(100 - (Number(item.data.newPrice / item.data.price * 100)))} %`
                                }
                            </Text>
                        </View>
                    }


                    <Image
                        style={{
                            width: "100%",
                            height: _heightScale(180),
                        }}
                        source={{ uri: `${item?.data?.image}` }}
                    />
                    <View
                        style={{ paddingHorizontal: _widthScale(10) }}>
                        <Text
                            style={{
                                fontSize: _widthScale(14),
                                marginTop: _heightScale(10),
                                lineHeight: _heightScale(18),
                            }}
                            numberOfLines={2}
                        >
                            {
                                item.data.name
                            }
                        </Text>
                        <Text style={{
                            marginTop: _heightScale(5)
                        }}>
                            Đã bán: {`${item.hasPay}`}
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: _heightScale(5)
                        }}>
                            <Image
                                style={{
                                    width: _widthScale(15),
                                    height: _widthScale(15),
                                    resizeMode: 'contain'
                                }}
                                source={require('../Image/a2.png')} />
                            <Text
                                style={{
                                    fontSize: _widthScale(11),
                                    color: 'grey',
                                    marginLeft: _widthScale(5)
                                }}
                            >
                                ({`${item.totalScore}`})
                            </Text>
                        </View>

                        <Text
                            style={[{
                                fontSize: _widthScale(16),
                                marginTop: _heightScale(5),
                                fontWeight: '500',
                            },
                            item.data.newPrice && {
                                textDecorationLine: 'line-through',
                                color: GREY_OPACITY
                            }
                            ]}
                        >
                            {
                                `${item.data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ`
                            }
                        </Text>
                        {
                            item.data.newPrice &&
                            <Text
                                style={{
                                    fontSize: _widthScale(16),
                                    marginTop: _heightScale(5),
                                    fontWeight: '500'
                                }}>
                                {
                                    `${item.data.newPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ`
                                }
                            </Text>
                        }
                    </View>
                </TouchableOpacity>
            </View>
        )
    }


    render() {
        return (
            <View style={[styles.container]}>
                <View style={[{
                    width: "100%",
                    height: _heightScale(50),
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    position: 'absolute',
                    zIndex: 1,
                    flexDirection: 'row'
                }, shadow]}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.goBack()
                    }}>
                        <Icon style={{ marginHorizontal: _widthScale(23) }} color={BASE_COLOR} name={'angle-left'} size={_widthScale(30)} />
                    </TouchableOpacity>
                    <TextInput
                        autoFocus={true}
                        onChangeText={this.onChangeTextDelayed}
                        style={{
                            // color: '#fff',
                            flex:1,
                            fontSize: _widthScale(14),
                            borderBottomWidth:_widthScale(0.5),
                            borderBottomColor:'rgba(182, 184, 182,0.4)',
                            marginRight:_widthScale(50)
                        }}
                        // placeholderTextColor={'#fff'}
                        placeholder={"Sản phẩm, thương hiệu và mọi thứ bạn cần"} />
                </View>
                <View style={{height:_heightScale(40)}}/>
                <FlatList
                    style={{
                    }}
                    renderItem={this._renderItem}
                    numColumns={2}
                    // data={props?.data?.slice(0, 10)}
                    data={this.state.listProducts}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        width: WIDTH_DIMENSION,
        height: _heightScale(50),
        backgroundColor: "#fff",
        flexDirection: 'row',
        alignItems: 'center'
    },
    goBackBtn: {
        marginHorizontal: _widthScale(20)
    },
    item: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: 'rgba(182, 184, 182,0.4)',
        backgroundColor: '#fff',
        // height: _heightScale(300),
        paddingHorizontal: _widthScale(5),
        paddingTop: _widthScale(5),
        paddingBottom: _widthScale(15)
    }
})
const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11
}


export default SearchingScreen;