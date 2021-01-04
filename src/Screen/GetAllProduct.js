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
import { _widthScale, _heightScale } from '../Constant/Scale';
import Comment from '../Component/Comment'
import RecomendForMe from '../Component/RecomendForMe'
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated from 'react-native-reanimated';
import { BASE_COLOR, GREY_OPACITY } from '../Constant/Color';

const GetAllProduct = props => {

    const [listItem, setListItem] = useState([
        1, 2
    ])

    useEffect(() => {

    }, []);

    const _renderItem = ({ item, index }) => {
        console.log(item.data.id);

        return (
            <View style={[styles.item,
            index % 2 == 0 ? { borderRightColor: '#fff', borderBottomColor: '#fff' }
                : { borderBottomColor: '#fff' },
            (index == listItem.length - 1 || index == listItem.length - 2) && { borderBottomColor: 'rgba(182, 184, 182,0.4)' }
            ]}>
                <TouchableOpacity
                    onPress={() => {
                        if (props.reload == true) {
                            props.navigation.goBack()
                            props.navigation.navigate('InfoProduct')
                        } else {
                            props.navigation.navigate('InfoProduct', { idProduct: item?.data?.id })
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

    return (
        <View style={{ flex: 1 }}>
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
                    props.navigation.goBack()
                }}>
                    <Icon style={{ marginHorizontal: _widthScale(23) }} color={BASE_COLOR} name={'angle-left'} size={_widthScale(30)} />
                </TouchableOpacity>
                <Text style={{
                    fontWeight: '500',
                    fontSize: _widthScale(16)
                }}>
                    {props?.route?.params?.title}
                </Text>
            </View>
            <View style={{ height: _heightScale(50), }} />
            <FlatList
                style={{
                }}
                renderItem={_renderItem}
                numColumns={2}
                // data={props?.data?.slice(0, 10)}
                data={props?.route?.params?.data}
            />
            {/* <View style={{height:_heightScale(50)}}/> */}
        </View>
    );
};

const styles = StyleSheet.create({
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


export default GetAllProduct;