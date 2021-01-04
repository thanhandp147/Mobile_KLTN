import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ImageBackground,
    Image,
    FlatList
} from 'react-native'
import { _widthScale, _heightScale, WIDTH_DIMENSION } from '../Constant/Scale';
import Comment from '../Component/Comment'
import RecomendForMe from '../Component/RecomendForMe'
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated from 'react-native-reanimated';
import { BASE_COLOR, GREY_OPACITY } from '../Constant/Color';
import { useDispatch, useSelector } from "react-redux";
import { confirmPayOrder } from '../Redux/Action/index';
import { handleApi } from '../Services/utils'



const CartScreen = props => {

    const dispatch = useDispatch();
    const { stateRedux } = useSelector(state => ({
        stateRedux: state.userReducer
    }));

    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        let totalPriceTemp = 0
        stateRedux?.listProductOfOrderNotPay.map(item => {

            totalPriceTemp += (item.data.newPrice ? item.data.newPrice : item.data.price) * item.count
        })
        setTotalPrice(totalPriceTemp)
    }, [])

    

    const confirmPay = () => {
        dispatch(confirmPayOrder({ orderID: stateRedux?.listProductOfOrderNotPay[0].idOrder }))
    }

    return (
        <View style={styles.container}>

            <View style={{
                width: WIDTH_DIMENSION,
                height: _heightScale(60),
                backgroundColor: BASE_COLOR,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: _widthScale(20)
            }}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.goBack()
                    }}
                    style={{
                        width: _widthScale(20),
                        height: _widthScale(20),
                    }}
                >
                    <Image
                        style={{
                            width: _widthScale(18),
                            height: _widthScale(18)
                        }}
                        resizeMode={'contain'}
                        source={require('../Image/iconX.png')}
                    />
                </TouchableOpacity>
                <Text style={{
                    fontSize: _widthScale(16),
                    fontWeight: 'bold',
                    color: '#fff'
                }}>
                    {`Giỏ hàng (${stateRedux?.listProductOfOrderNotPay.length})`}
                </Text>
                <View
                    style={{
                        width: _widthScale(20),
                        height: _widthScale(20),
                    }}
                >
                </View>
            </View>
            <ScrollView style={{ flex: 1 }}>
                {
                    stateRedux?.listProductOfOrderNotPay?.length > 0 &&
                    stateRedux?.listProductOfOrderNotPay.map((item, index) => {

                        return (
                            <View style={{ paddingVertical: _heightScale(10), paddingHorizontal: _widthScale(15), backgroundColor: '#fff', flexDirection: 'row', marginBottom: _heightScale(8) }} key={index}>
                                <Image
                                    style={{
                                        width: _widthScale(100),
                                        height: _widthScale(100)
                                    }}
                                    source={{ uri: `${item.data.image}` }}
                                />

                                <View style={{ flex: 1, marginLeft: _widthScale(10) }}>
                                    <Text >
                                        {
                                            item?.data?.name ?
                                                `${item?.data?.name}`
                                                :
                                                ``
                                        }
                                    </Text>
                                    {
                                        item?.data?.newPrice ?
                                            <Text
                                                style={{
                                                    fontSize: _widthScale(16),
                                                    marginTop: _heightScale(10),
                                                    fontWeight: '500', color: '#FF424E'
                                                }}>
                                                {
                                                    `${item?.data?.newPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ`
                                                }
                                            </Text>
                                            :
                                            <></>
                                    }

                                    <Text
                                        style={[{
                                            fontSize: _widthScale(16),
                                            marginTop: _heightScale(5),
                                            fontWeight: '500',
                                        },
                                        item?.data?.newPrice && {
                                            textDecorationLine: 'line-through',
                                            color: GREY_OPACITY
                                        }
                                        ]}>
                                        {
                                            `${item?.data?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ`
                                        }
                                    </Text>
                                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                        <Text>
                                            {`Số lượng: ${item?.count}`}
                                        </Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    onPress={() => {
                                        props.navigation.goBack()
                                    }}
                                    style={{
                                        width: _widthScale(20),
                                        height: _widthScale(20),
                                        marginLeft: _widthScale(15)
                                    }}>
                                    <Image
                                        style={{
                                            width: _widthScale(12),
                                            height: _widthScale(12)
                                        }}
                                        resizeMode={'contain'}
                                        source={require('../Image/iconX2.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </ScrollView>
            {/* Bottom */}
            <View style={{ backgroundColor: '#fff', paddingTop: _heightScale(10), paddingHorizontal: _widthScale(23), borderTopWidth: _widthScale(0.5), borderColor: 'rgba(182, 184, 182,0.4)' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{
                        fontSize: _widthScale(16),
                        marginBottom: _heightScale(15),
                        fontWeight: '500',
                        color: 'grey'
                    }}>
                        Thành tiền
                    </Text>
                    <Text style={{
                        color: '#E78291',
                        fontWeight: 'bold',
                        fontSize: _widthScale(18)
                    }}>
                        {
                            `${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ`
                        }
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        confirmPay()
                    }}
                    style={{
                        width: "100%",
                        height: _widthScale(45),
                        // backgroundColor: BASE_COLOR,
                        backgroundColor: '#FF424E',
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: _widthScale(5)
                    }}
                >
                    <Text
                        style={{
                            fontSize: _widthScale(16),
                            color: '#fff',
                            fontWeight: '500'
                        }}
                    >
                        Tiến hành đặt hàng
                </Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default CartScreen;