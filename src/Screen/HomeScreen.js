import React, { Component } from 'react';
import { View, StyleSheet, Text, StatusBar, Image ,TouchableOpacity} from 'react-native';
import { _widthScale, _heightScale } from '../Constant/Scale';
import Icon from 'react-native-vector-icons/FontAwesome';
import {  TextInput, ScrollView } from 'react-native-gesture-handler';
// import LinearGradient from 'react-native-linear-gradient';

import HomeCarousel from '../Component/HomeCarousel';
import HomeDealShock from '../Component/HomeDealShock';
import CategoryHot from '../Component/CategoryHot';
import RecomendForMe from '../Component/RecomendForMe'

import { BASE_URL } from '../Constant/Url';

import { getToplistProducts, getAllCampaign, getAllProductNewPrice, getRecommendProductBySimilarity,getRecommendProductBySimilarity2, getAllCategory } from '../Services/api';
import { handleApi } from '../Services/utils'
import { BASE_COLOR } from '../Constant/Color';
import { connect } from 'react-redux'
import Axios from 'axios'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";



class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            listTopProducts: [],
            listCampaigns: [],
            listProductHasNewPrice: [],
            listRecommendProductBySimilarity: [],
            listRecommendProductBySimilarity2: [],
            listCategory: []
        }
    }


    async componentDidMount() {


        let result = await handleApi(getToplistProducts());

        this.setState({
            listTopProducts: result.data
        })

        let resultAllProductHasNewPrice = await handleApi(getAllProductNewPrice());
        this.setState({
            listProductHasNewPrice: resultAllProductHasNewPrice.data
        }) 

        let resultAllCampaign = await handleApi(getAllCampaign());
        this.setState({
            listCampaigns: resultAllCampaign.data
        })

        



        if (this.props.infoUser.id) {
            let listRecommendProductBySimilarity = await handleApi(getRecommendProductBySimilarity())
            this.setState({
                listRecommendProductBySimilarity: listRecommendProductBySimilarity.data
            })
            // let listRecommendProductBySimilarity2 = await handleApi(getRecommendProductBySimilarity2())
            // this.setState({
            //     listRecommendProductBySimilarity2: listRecommendProductBySimilarity2.data
            // })
        }
    }

    // async componentDidUpdate(prevProps, prevState){
    //     console.log(`didUpdate`);

    //     if (this.props.infoUser.id) {
    //         let listRecommendProductBySimilarity = await handleApi(getRecommendProductBySimilarity())

    //         this.setState({
    //             listRecommendProductBySimilarity: listRecommendProductBySimilarity.data
    //         })
    //     }
    // }

    checkCart = () => {
        let { token } = Axios.defaults.headers;
        if (token) {
            this.props.navigation.navigate('Cart')
        } else {
            this.props.navigation.navigate('SignIn')
        }
    }

    render() {
        return (
            // <View style={[styles.container]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: BASE_COLOR }}>
                    {/* <LinearGradient
                        colors={gradient.color}
                        style={gradient.container}
                    > */}
                    <View style={styles.headerHome}>
                        {/* <TouchableOpacity

                            >
                                <Icon name="asterisk" size={26} color={'#fff'} />
                            </TouchableOpacity> */}
                        <View style={{ width: _widthScale(30) }}>
                        </View>
                        <Image
                            style={{
                                width: _widthScale(100),
                                height: _widthScale(30),
                                alignSelf: 'center',
                            }}
                            resizeMode={'contain'}
                            source={require('../Image/logo.png')}
                        />
                        <View style={{ flexDirection: 'row', width: _widthScale(30) }}>
                            <View style={{
                                position: 'absolute',
                                zIndex: 1,
                                width: _widthScale(16),
                                height: _widthScale(16),
                                borderRadius: _widthScale(8),
                                backgroundColor: '#FF424E',
                                justifyContent: 'center',
                                alignItems: 'center',
                                right: 0,
                                top: -_widthScale(5)
                            }}>
                                <Text style={{
                                    fontSize: _widthScale(8),
                                    color: '#fff',
                                    fontWeight: 'bold'
                                }}>
                                    {
                                        this?.props?.listProductOfOrderNotPay.length
                                    }
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    this.checkCart()
                                }}>
                                <Icon name="shopping-cart" size={26} color={'#fff'} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('Searching')
                        }}
                        activeOpacity={.8}
                        style={styles.inputHeader}>
                        <Icon name="search" size={26} style={{ marginHorizontal: _widthScale(10) }} color={'#BCBCBC'} />
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: 'grey' }}>
                                Bạn tìm gì hôm nay
                            </Text>
                        </View>
                        {/* <TextInput
                            style={{
                                flex: 1,
                                paddingVertical: 0
                            }}
                            placeholder={'Bạn tìm gì hôm nay'}
                        /> */}
                    </TouchableOpacity>

                    {/* <View style={{alignSelf:'center', alignItems:'center', justifyContent:'center'}}> */}
                    <View style={{ marginVertical: _heightScale(15) }}>
                        {
                            this.state?.listCampaigns?.length > 0 ?
                                <HomeCarousel
                                    navigation={this.props.navigation}
                                    data={this.state.listCampaigns}
                                />
                                :
                                <SkeletonPlaceholder>
                                    <SkeletonPlaceholder.Item alignSelf="center" flexDirection="row" alignItems="center">
                                        <SkeletonPlaceholder.Item width={_heightScale(100)} height={_heightScale(100)} borderRadius={_heightScale(50)} />
                                        <SkeletonPlaceholder.Item marginLeft={20}>
                                            <SkeletonPlaceholder.Item width={_widthScale(200)} height={20} borderRadius={4} />
                                            <SkeletonPlaceholder.Item
                                                marginTop={6}
                                                width={80}
                                                height={20}
                                                borderRadius={4}
                                            />
                                        </SkeletonPlaceholder.Item>
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder>
                        }


                    </View>

                    <View style={{ alignSelf: 'center' }}>
                        <HomeDealShock
                            navigation={this.props.navigation}
                            data={this.state.listProductHasNewPrice}
                        />
                    </View>
                    <View style={{ height: _heightScale(50) }}>

                    </View>
                    <Image
                        style={{
                            position: 'absolute',
                            bottom: -4
                        }}
                        source={require('../Image/a1.png')}
                    />

                    {/* </LinearGradient> */}
                </View>

                <View style={{
                    backgroundColor: '#fff',
                }}>
                    <CategoryHot />
                </View>

                <View style={{
                    marginTop: _heightScale(10),
                    backgroundColor: '#fff',
                }}>
                    <RecomendForMe
                        navigation={this.props.navigation}
                        data={this.state.listTopProducts}
                        title={'Sản phẩm đang HOT'}
                    />
                </View>

                <View style={{
                    marginTop: _heightScale(10),
                    backgroundColor: '#fff',
                }}>
                    <RecomendForMe
                        navigation={this.props.navigation}
                        title={'Gợi ý hôm nay'}
                        data={this.state.listRecommendProductBySimilarity}
                    />
                </View>

                {/* <View style={{
                    marginTop: _heightScale(10),
                    backgroundColor: '#fff',
                }}>
                    <RecomendForMe
                        navigation={this.props.navigation}
                        title={'Mua ngay kẻo lỡ'}
                        data={this.state.listRecommendProductBySimilarity2}
                    />
                </View> */}






            </ScrollView>
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    inputHeader: {
        marginTop: _heightScale(15),
        alignSelf: 'center',
        width: _widthScale(330),
        borderRadius: _widthScale(10),
        borderColor: '#C4C4C4',
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingVertical: _heightScale(10),
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerHome: {
        marginTop: _heightScale(15),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: _widthScale(20)
    },
    container: {
        flex: 1,
        backgroundColor: '#2789FF'
        // backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row'
    }
})

const gradient = {
    container: {
        flex: 1
    },
    color: [
        'rgba(1,140,115, 1)',
        'rgba(1,140,115, .8)',
        'rgba(1,140,115, .6)',
        'rgba(1,140,115, .8)',
        'rgba(1,140,115, 1)',

    ],
}

const mapStateToProps = state => ({
    infoUser: state.userReducer.infoUser,
    listProductOfOrderNotPay: state.userReducer.listProductOfOrderNotPay
});

export default connect(mapStateToProps, {})(HomeScreen);