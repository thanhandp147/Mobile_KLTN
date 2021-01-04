import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { Image, View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { _widthScale, _heightScale } from '../Constant/Scale';
import { GREY_OPACITY, BASE_COLOR } from '../Constant/Color'

const RecomendForMe = props => {
    const [listItem, setListItem] = useState([
        1, 2
    ])

    // useEffect(() => {
    //     console.log(props.data.length);
    // }, [props.listTopProducts]);

    const _renderItem = ({ item, index }) => {
        // console.log(item);

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
                            props.navigation.navigate('InfoProduct', { idProduct: item.data.id })
                        } else {
                            props.navigation.navigate('InfoProduct', { idProduct: item.data.id })
                        }
                    }}
                    activeOpacity={0.8}
                >
                    {
                        item?.data?.newPrice &&
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
                                    `- ${100 - (Number(item.data.newPrice / item.data.price * 100))} %`
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
                                fontSize: _widthScale(16),
                                marginTop: _heightScale(10),
                                lineHeight: _heightScale(18),
                            }}
                            numberOfLines={2}
                        >
                            {
                                item?.data?.name
                            }
                        </Text>
                        {
                            item?.hasPay ?
                            <Text style={{
                                marginTop: _heightScale(5)
                            }}>
                                Đã bán: {`${item.hasPay}`}
                            </Text>
                            :
                            <>
                            </>
                        }


                        {
                            item?.totalScore &&

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
                            ]}
                        >
                            {
                                `${item?.data?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ`
                            }
                        </Text>
                        {
                            item?.data?.newPrice &&
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
        <View style={{

        }}>
            <View style={styles.header}>
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: _widthScale(15),
                        color:BASE_COLOR
                    }}
                >
                    {
                        props.title
                    }
                </Text>
                {
                    props.hideReadMore ?
                        <>
                        </>
                        :
                        <TouchableOpacity
                            onPress={() => {
                                props.navigation.navigate('AllProduct', { data: props?.data, title: props.title })
                            }}
                        >
                            <Text>
                                Xem thêm
                            </Text>
                        </TouchableOpacity>
                }

            </View>

            <FlatList
                style={{
                }}
                renderItem={_renderItem}
                numColumns={2}
                data={props?.data?.slice(0, 10)} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: _widthScale(15),
        alignItems: 'center',
        paddingHorizontal: _widthScale(20),
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


export default RecomendForMe;