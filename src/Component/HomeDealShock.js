import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { View, StyleSheet, Text, StatusBar, Image, ImageBackground ,TouchableOpacity} from 'react-native';
import { _widthScale, _heightScale, WIDTH_DIMENSION, HEIGHT_DIMENSION } from '../Constant/Scale';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";


const HomeDealShock = props => {


    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: _widthScale(10) }}>
                <Text style={{
                    fontSize: _widthScale(15),
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                    color: '#EA9055'
                }}>
                    Giá sốc hôm nay
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate('AllProduct', { data: props?.data, title: `Giá sốc hôm nay` })
                    }}
                    style={{ flexDirection: 'row', alignItems: 'center', padding: _widthScale(5) }}>
                    <Text style={{
                        marginRight: _widthScale(5)
                    }}>
                        Xem thêm
                    </Text>
                    <Icon name={'chevron-right'} />
                </TouchableOpacity>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}>

                {
                    props?.data?.length > 0 ?
                        props?.data?.slice(0, 5).map((item, index) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={.8}
                                    onPress={() => {
                                        props.navigation.navigate('InfoProduct', { idProduct: item?.data?.id })
                                    }}
                                    key={index}
                                    style={{ alignItems: 'center', marginLeft: _widthScale(15), marginTop: _heightScale(10) }}>
                                    <View key={index} style={styles.itemCarousel}>
                                        <ImageBackground
                                            style={{
                                                width: "100%",
                                                height: '100%'
                                            }}
                                            resizeMode={'cover'}
                                            source={{ uri: item?.data?.image }}>
                                            <View style={{
                                                width: _widthScale(40),
                                                height: _heightScale(15),
                                                backgroundColor: '#FF424E',
                                                position: 'absolute',
                                                borderRadius: _widthScale(5)
                                            }}>
                                                <Text style={{
                                                    color: '#fff',
                                                    alignSelf: 'center',
                                                    fontSize: _widthScale(11),
                                                    fontWeight: '500'
                                                }}>
                                                    {
                                                        `- ${parseInt(100 - (Number(item.data.newPrice / item.data.price * 100)))} %`
                                                    }
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                    <Text style={{
                                        marginTop: _heightScale(10),
                                        fontWeight: '500'
                                    }}>
                                        {`${item.data.newPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ`}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })
                        :
                        <SkeletonPlaceholder>
                            <SkeletonPlaceholder.Item flexDirection={'row'}>
                                <SkeletonPlaceholder.Item alignSelf="center" flexDirection="row" alignItems="center">
                                    <SkeletonPlaceholder.Item>
                                        <SkeletonPlaceholder.Item width={_widthScale(100)} height={_widthScale(100)} marginLeft={_widthScale(15)} />

                                        <SkeletonPlaceholder.Item width={_widthScale(100)} height={_widthScale(20)} marginLeft={_widthScale(15)} marginTop={_heightScale(10)} />
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder.Item>
                                <SkeletonPlaceholder.Item alignSelf="center" flexDirection="row" alignItems="center">
                                    <SkeletonPlaceholder.Item>
                                        <SkeletonPlaceholder.Item width={_widthScale(100)} height={_widthScale(100)} marginLeft={_widthScale(15)} />

                                        <SkeletonPlaceholder.Item width={_widthScale(100)} height={_widthScale(20)} marginLeft={_widthScale(15)} marginTop={_heightScale(10)} />
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder.Item>
                                <SkeletonPlaceholder.Item alignSelf="center" flexDirection="row" alignItems="center">
                                    <SkeletonPlaceholder.Item>
                                        <SkeletonPlaceholder.Item width={_widthScale(100)} height={_widthScale(100)} marginLeft={_widthScale(15)} />

                                        <SkeletonPlaceholder.Item width={_widthScale(100)} height={_widthScale(20)} marginLeft={_widthScale(15)} marginTop={_heightScale(10)} />
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder>

                }
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    itemCarousel: {
        width: _widthScale(100),
        height: _widthScale(100),
        overflow: 'hidden',
    },
    container: {
        width: _widthScale(330),
        height: _widthScale(200),
        paddingBottom: _heightScale(20),
        backgroundColor: '#fff',
        borderRadius: _widthScale(10),
        overflow: 'hidden'
    }
})

export default HomeDealShock;