import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ImageBackground,
    Image,
    Platform
} from 'react-native'
import { _widthScale, _heightScale, WIDTH_DIMENSION } from '../Constant/Scale';
import { BASE_COLOR, GREY_OPACITY } from '../Constant/Color'
import Comment from '../Component/Comment'
import RecomendForMe from '../Component/RecomendForMe'
import Icon from 'react-native-vector-icons/FontAwesome';
import Animated from 'react-native-reanimated';

import { getInfoProductByID, getProductSameCategory, addProductToCart, handlePostNewCmt, setNewClickProduct } from '../Services/api';
import { handleApi } from '../Services/utils'
import Axios from 'axios'
import Modal from 'react-native-modal'

import moment from 'moment'
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from "react-redux";
import Store from '../Redux/Store'
import * as ActionType from "../Redux/Constants/ActionType";




const InfoProduct = props => {
    const [offsetY, setOffsetY] = useState(new Animated.Value(0))
    const [infoProduct, setInfoProduct] = useState({})
    const [listProductSameCategory, setListProductSameCategory] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showModalCheckSao, setShowModalCheckSao] = useState(false)
    const [countProduct, setCountProduct] = useState(1)
    const [listNewCmt, setListNewCmt] = useState([])
    const [newCmt, setNewCmt] = useState('')
    const [isGoodCmt, setIsGoodCmt] = useState(null)



    const _onscrolling = (i) => {
        setOffsetY(i.nativeEvent.contentOffset.y / 100)
    }

    const { stateRedux } = useSelector(state => ({
        stateRedux: state.userReducer
    }));


    const fetchInfoProduct = async (idProduct) => {

        let { token } = Axios.defaults.headers;
        if (token) {
            let newClick = await handleApi(setNewClickProduct(idProduct))
            console.log({ newClick });
        }

        let infoProduct = await handleApi(getInfoProductByID(idProduct));

        if (!infoProduct.error) {
            setInfoProduct(infoProduct.data)
        }

        console.log(`infoProduct-------`);

        console.log(infoProduct);



        let listProductSameCategory = await handleApi(getProductSameCategory(idProduct))
        if (!listProductSameCategory.error) {
            let listProTemp = []
            listProductSameCategory.data.map(item => {
                newFormat = {
                    data: item
                }
                listProTemp.push(newFormat)
            })
            setListProductSameCategory(listProTemp)
        }
    }

    const _showModalSignInDone = () => {
        return (
            <Modal
                style={{
                    margin: 0, // This is the important style you need to set
                    alignItems: undefined,
                    justifyContent: 'flex-end',
                }}
                avoidKeyboard={false}
                useNativeDriver={true}
                animationIn="slideInUp"
                onBackdropPress={() => { setShowModal(false) }}
                animationOut='slideOutDown'
                coverScreen={Platform.OS == "ios" ? false : true}
                hasBackdrop={true}
                isVisible={showModal}>

                <View style={{
                    width: WIDTH_DIMENSION,
                    backgroundColor: '#FFFFFF',
                    borderTopStartRadius: _widthScale(10),
                    borderTopEndRadius: _widthScale(10),
                    overflow: "hidden",
                    paddingVertical: _heightScale(30),
                    paddingHorizontal: _widthScale(15)
                }}>
                    {/* <Image
                        style={{
                            width: '100%',
                            height: _heightScale(250)
                        }}
                        resizeMode={'contain'}
                        source={require('../../Image/coverSignUpDone.png')}
                    /> */}
                    <View style={{
                        flexDirection: 'row',
                        // alignItems: 'center'
                    }}>
                        <Image
                            style={{
                                width: _widthScale(100),
                                height: _heightScale(100)
                            }}
                            resizeMode={'contain'}
                            source={{ uri: `${infoProduct?.data?.image}` }}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={{
                                fontSize: _widthScale(16),
                            }}>
                                {
                                    `${infoProduct?.data?.name}`
                                }
                            </Text>

                            {
                                infoProduct?.data?.newPrice ?
                                    <Text
                                        style={{
                                            fontSize: _widthScale(16),
                                            marginTop: _heightScale(10),
                                            fontWeight: '500', color: '#FF424E'
                                        }}>
                                        {
                                            `${infoProduct?.data?.newPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ`
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
                                infoProduct?.data?.newPrice && {
                                    textDecorationLine: 'line-through',
                                    color: GREY_OPACITY
                                }
                                ]}>
                                {
                                    `${infoProduct?.data?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ`
                                }
                            </Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: _heightScale(10) }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (countProduct < 2) return
                                        setCountProduct(countProduct - 1)
                                    }}
                                    style={{
                                        width: _widthScale(25),
                                        height: _widthScale(25),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: 'rgba(173, 173, 173,.5)'
                                    }}>
                                    <Text>
                                        -
                                    </Text>
                                </TouchableOpacity>

                                <Text style={{ marginHorizontal: _widthScale(15) }}>
                                    {
                                        countProduct
                                    }
                                </Text>

                                <TouchableOpacity
                                    onPress={() => {
                                        setCountProduct(countProduct + 1)
                                    }}
                                    style={{
                                        width: _widthScale(25),
                                        height: _widthScale(25),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: 'rgba(173, 173, 173,.5)'
                                    }}>
                                    <Text>
                                        +
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>


                    </View>



                    <TouchableOpacity
                        onPress={() => {
                            confirmAddToCart()
                        }}
                        activeOpacity={.8}
                        style={{
                            width: _widthScale(320),
                            alignSelf: 'center',
                            height: _heightScale(48),
                            backgroundColor: BASE_COLOR,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: _widthScale(5),
                            marginTop: _heightScale(30)
                        }}>
                        <Text style={{
                            fontSize: _widthScale(15),
                            color: "#fff",
                            fontWeight: '500'
                        }}>
                            Thêm vào giỏ hàng
                    </Text>
                    </TouchableOpacity>


                </View>
            </Modal>
        )
    }

    const _showModalCheckSao = () => {
        return (
            <Modal
                style={{
                    margin: 0, // This is the important style you need to set
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                avoidKeyboard={false}
                useNativeDriver={true}
                animationIn="slideInUp"
                onBackdropPress={() => { setShowModalCheckSao(false) }}
                animationOut='slideOutDown'
                coverScreen={Platform.OS == "ios" ? false : true}
                hasBackdrop={true}
                isVisible={showModalCheckSao}>

                <View style={{
                    width: _widthScale(300),
                    backgroundColor: '#FFFFFF',
                    borderTopStartRadius: _widthScale(10),
                    borderTopEndRadius: _widthScale(10),
                    borderRadius: _widthScale(10),
                    overflow: "hidden",
                    paddingVertical: _heightScale(30),
                    paddingHorizontal: _widthScale(15)
                }}>
                    <Text style={{
                        fontSize: _widthScale(15),
                        fontWeight: '500',
                        alignSelf: 'center',
                        marginBottom: _heightScale(20)
                    }}>
                        Bạn có hài lòng về sản phẩm này?
                    </Text>
                    <Image
                        style={{
                            width: '100%',
                            height: _heightScale(150)
                        }}
                        resizeMode={'contain'}
                        source={require('../Image/q1.png')}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: _heightScale(20) }}>
                        <TouchableOpacity
                            onPress={() => {
                                postNewCmt(0)
                            }}
                            style={{
                                width: _widthScale(100),
                                height: _widthScale(30),
                                backgroundColor: '#fff',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Text>
                                Không hài lòng
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                postNewCmt(1)
                            }}
                            style={{
                                width: _widthScale(100),
                                height: _widthScale(30),
                                backgroundColor: BASE_COLOR,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: _widthScale(10),
                                marginLeft: _widthScale(20)
                            }}>
                            <Text style={{ color: '#fff', fontWeight: '500' }}>
                                Hài lòng
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    useEffect(() => {
        fetchInfoProduct(props.route.params.idProduct)


    }, [props.route.params.idProduct]);

    const _addToCart = () => {
        let { token } = Axios.defaults.headers;
        if (token) {
            setShowModal(true)
        } else {
            props.navigation.navigate('SignIn', { _showModalAddToCart: setShowModal })
        }
    }

    const confirmAddToCart = async () => {
        let resultAddProductToCat = await handleApi(addProductToCart({
            productID: infoProduct.data.id,
            amount: Number(countProduct)
        }))
        if (resultAddProductToCat.data && resultAddProductToCat.data.length == 0) {
            setShowModal(false)
            return alert('Sản phẩm đã có trong giỏ hàng')
        } else {
            setShowModal(false)
            console.log({ resultAddProductToCat });
            Store.dispatch({
                type: ActionType.UPDATE_CART,
                payload: resultAddProductToCat.data
            })

            return alert('Thêm sản phẩm thành công')
        }
    }

    const checkLogin = () => {


        let { token } = Axios.defaults.headers;
        if (token) {

            setShowModalCheckSao(true)
        } else {
            props.navigation.navigate('SignIn')
        }
    }

    const postNewCmt = async (flag) => {

        let resultComment = await handleApi(handlePostNewCmt({
            productID: infoProduct.data.id,
            content: newCmt,
            isGoodComment: flag
        }));

        console.log({ resultComment });


        let newComment = {
            author: stateRedux.infoUser.name,
            isGoodCmt: flag,
            content: newCmt,
            timeCreate: new Date(),
            idProduct: infoProduct.data.id
        }
        setShowModalCheckSao(false)
        setNewCmt('')
        setListNewCmt([newComment, ...listNewCmt])
    }



    return (
        <View style={styles.container}>
            {
                _showModalSignInDone()
            }
            {
                _showModalCheckSao()
            }
            <Animated.View style={[{
                position: 'absolute',
                zIndex: 1,
                width: "100%",
                paddingHorizontal: _widthScale(20),
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: `rgba(255, 255, 255,${offsetY})`,
                // opacity: offsetY,
                height: _heightScale(50),
                alignItems: 'center'
            },
            offsetY > 1 && shadow
            ]}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.goBack()
                    }}
                    style={{
                        width: _widthScale(30),
                        height: _widthScale(30),
                        borderRadius: _widthScale(15),
                        backgroundColor: 'rgba(142, 145, 142,0.5)',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Icon size={_widthScale(24)} name="long-arrow-left" />
                </TouchableOpacity>
                <Text>
                    {/* cart */}
                </Text>
            </Animated.View>
            <ScrollView
                onScroll={_onscrolling}
                scrollEventThrottle={16}
            >
                <Image
                    style={{
                        width: '100%',
                        height: _heightScale(300)
                    }}
                    resizeMode={'contain'}
                    source={{ uri: `${infoProduct?.data?.image}` }}
                />
                <View style={{
                    backgroundColor: '#fff',
                    paddingBottom: _heightScale(15)
                }}>
                    <Text style={{
                        fontSize: _widthScale(16),
                        marginHorizontal: _widthScale(15),
                        marginTop: _heightScale(15),
                        fontWeight: 'bold'
                    }}>
                        {
                            infoProduct?.data?.name ?
                                `${infoProduct?.data?.name}`
                                :
                                ``
                        }
                    </Text>

                    {
                        infoProduct?.totalScore ?

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: _heightScale(15),
                                marginLeft: _widthScale(15)
                            }}>
                                <Image
                                    style={{
                                        width: _widthScale(20),
                                        height: _widthScale(20),
                                        resizeMode: 'contain'
                                    }}
                                    source={require('../Image/a2.png')} />
                                {
                                    infoProduct?.totalScore ?
                                        <Text
                                            style={{
                                                fontSize: _widthScale(14),
                                                color: 'grey',
                                                marginLeft: _widthScale(5)
                                            }}
                                        >
                                            ({`${infoProduct?.totalScore} điểm tương tác sản phẩm này`})
                                        </Text>
                                        :
                                        <Text
                                            style={{
                                                fontSize: _widthScale(14),
                                                color: 'grey',
                                                marginLeft: _widthScale(5)
                                            }}
                                        >
                                            ({`Chưa có điểm tương tác về sản phẩm này`})
                            </Text>
                                }

                            </View>
                            :
                            <>
                            </>
                    }

                    {/* <Text>
                        {
                            moment(1604052214578).format('DD/MM/YYYY')
                        }
                    </Text> */}

                    {
                        infoProduct?.data ?
                            <Text
                                style={{
                                    fontSize: _widthScale(20),
                                    marginTop: _heightScale(15),
                                    fontWeight: '500',
                                    marginLeft: _widthScale(15)
                                }}>
                                {
                                    infoProduct?.data?.newPrice ?
                                        `${infoProduct?.data?.newPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ`
                                        :
                                        `${infoProduct?.data?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ`
                                }
                                {
                                    infoProduct.data.newPrice &&
                                    <Text style={{
                                        color: '#FF424E',
                                        fontSize: _widthScale(16),
                                    }}>
                                        {` (- ${parseInt(100 - (Number(infoProduct.data.newPrice / infoProduct.data.price * 100)))} %)`}
                                    </Text>
                                }

                            </Text>
                            :
                            <></>
                    }

                </View>

                <View style={{
                    marginTop: _heightScale(10),
                    backgroundColor: '#fff',
                    paddingBottom: _heightScale(20)
                }}>
                    <Text style={{
                        fontSize: _widthScale(16),
                        marginLeft: _widthScale(15),
                        marginTop: _heightScale(10),
                        fontWeight: 'bold'
                    }}>
                        Khách hàng nhận xét
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: _widthScale(15), marginVertical: _heightScale(10) }}>

                        <TextInput
                            onChangeText={(content) => {
                                setNewCmt(content)
                            }}
                            value={newCmt}
                            style={{
                                paddingLeft: _widthScale(10),
                                width: _widthScale(250),
                                height: _widthScale(30),
                                borderRadius: _widthScale(10),
                                borderWidth: _widthScale(0.5),
                                borderColor: 'rgba(182, 184, 182,0.9)',
                                padding:0
                            }}
                            placeholder={'Thêm nhận xét của bạn'}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                checkLogin()
                            }}
                            style={{
                                width: _widthScale(70),
                                height: _widthScale(30),
                                borderRadius: _widthScale(10),
                                backgroundColor: BASE_COLOR,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Text style={{
                                fontSize: _widthScale(12),
                                fontWeight: 'bold',
                                color: '#fff'
                            }}>
                                Xác nhận
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {
                        listNewCmt && listNewCmt.map((item, index) => {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        marginTop: _heightScale(10),
                                        paddingHorizontal: _widthScale(15)
                                    }}
                                >
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Text style={{
                                            fontSize: _widthScale(15)
                                        }}>
                                            {`${item.author}  `}
                                            <Text
                                                style={[{
                                                    fontSize: _widthScale(14)
                                                },
                                                item.isGoodCmt == 1 ?
                                                    { color: '#33AB43' }
                                                    :
                                                    { color: '#FF424E' }
                                                ]}
                                            >
                                                {
                                                    item.isGoodCmt == 1 ?
                                                        `(Hài lòng)`
                                                        :
                                                        `(Không hài lòng)`
                                                }

                                            </Text>
                                        </Text>

                                        <Text style={{
                                            color: 'grey'
                                        }}>
                                            {
                                                item.timeCreate ?
                                                    moment(props?.data?.timeCreate).format('DD/MM/YYYY')
                                                    :
                                                    <>
                                                    </>
                                            }
                                        </Text>
                                    </View>

                                    <Text style={{
                                        marginTop: _heightScale(10),
                                        fontSize: _widthScale(14),
                                        lineHeight: _heightScale(24),
                                        marginHorizontal: _widthScale(25)
                                    }}>
                                        {item.content}
                                    </Text>
                                    <View style={{
                                        height: _widthScale(0.5),
                                        backgroundColor: 'rgba(182, 184, 182,0.4)',
                                        marginTop: _heightScale(10)
                                    }} />
                                </View>
                            )
                        })
                    }
                    {
                        infoProduct?.comments && infoProduct?.comments?.map((item, index) => {
                            return (
                                <Comment
                                    data={item}
                                    flag={Number(item.isGoodCmt)} />
                            )
                        })
                    }
                    {infoProduct?.comments?.length == 0 &&
                        <Text style={{
                            marginTop: _heightScale(10),
                            marginLeft: _widthScale(15)
                        }}>
                            Hiện chưa có bình luận về sản phẩm này
                        </Text>
                    }
                </View>

                <View style={{
                    marginTop: _heightScale(10),
                    backgroundColor: '#fff',
                }}>
                    <RecomendForMe
                        hideReadMore={true}
                        data={listProductSameCategory}
                        reload={true}
                        navigation={props.navigation}
                        title={'Sản phẩm tương tự'}
                    />
                    {/* {
                        listProductSameCategory && listProductSameCategory.length > 0 &&
                        listProductSameCategory.map((item, index) => {
                            return (
                                
                            )
                        })
                    } */}
                </View>

            </ScrollView>


            {/* Bottom */}
            <View style={{ backgroundColor: '#fff', paddingTop: _heightScale(10) }}>
                <TouchableOpacity
                    onPress={_addToCart}
                    style={{
                        width: _widthScale(320),
                        height: _widthScale(45),
                        backgroundColor: BASE_COLOR,
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
                        Thêm vào giỏ hàng
                </Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
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

export default InfoProduct;