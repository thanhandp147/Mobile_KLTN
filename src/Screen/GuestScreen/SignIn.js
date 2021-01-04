import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, StatusBar, Image, ScrollView, Platform ,TouchableOpacity} from 'react-native';
import { _widthScale, _heightScale } from '../../Constant/Scale';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_COLOR, GREY_OPACITY } from '../../Constant/Color'
import {  TextInput } from 'react-native-gesture-handler';
import Modal from 'react-native-modal'

import { handleApi } from '../../Services/utils'

import { useDispatch, useSelector } from "react-redux";
import { _login } from '../../Redux/Action/index';


const SignIn = props => {

    const [showModal, setShowModal] = useState(false)
    const [phoneNumber, setphoneNumber] = useState('0961096902')
    const [password, setPassword] = useState('123123123')

    const dispatch = useDispatch();


    const _showModalSignInDone = () => {
        return (
            <Modal
                avoidKeyboard={false}
                useNativeDriver={true}
                animationIn="slideInRight"
                animationOut='slideOutRight'
                coverScreen={Platform.OS == "ios" ? false : false}
                hasBackdrop={true}
                isVisible={showModal}>

                <View style={{
                    width: _widthScale(337),
                    backgroundColor: '#FFFFFF',
                    // height: _widthScale(532),
                    borderRadius: _widthScale(20),
                    overflow: "hidden",
                    paddingBottom: _heightScale(30)
                }}>
                    <Image
                        style={{
                            width: '100%',
                            height: _heightScale(250)
                        }}
                        resizeMode={'contain'}
                        source={require('../../Image/coverSignUpDone.png')}
                    />
                    <Text style={{
                        fontSize: _widthScale(22),
                        alignSelf: 'center',
                        marginTop: _heightScale(20)
                    }}>
                        Đăng nhập thành công!
                    </Text>
                    <Text style={{
                        fontSize: _widthScale(16),
                        alignSelf: 'center',
                        marginTop: _heightScale(20),
                        color: GREY_OPACITY
                    }}>
                        Chúc bạn có trải nghiệm tốt nhất ở EC
                    </Text>

                    <TouchableOpacity
                        onPress={_goBack}
                        // activeOpacity={.8}
                        style={{
                            width: _widthScale(300),
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
                            Tiếp tục mua sắm
                    </Text>
                    </TouchableOpacity>


                </View>
            </Modal>
        )
    }

    const _goBack = () => {
        props.navigation.goBack()
        if (props?.route?.params?._showModalAddToCart) {
            props.route.params._showModalAddToCart(true)
        }
    }

    const _onConfirmSignIn = () => {
        if (!phoneNumber || !password) return alert('Vui lòng nhập đầy đủ')
        dispatch(_login({ phoneNumber, password, setShowModal }))

    }

    return (

        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps='handled'
        >
            {
                _showModalSignInDone()
            }
            <Image
                source={require('../../Image/coverSignIn.png')}
                style={{
                    height: _heightScale(150),
                    width: "100%"
                }}
                resizeMode={'cover'}
            />

            <View style={{
                paddingHorizontal: _widthScale(30)
            }}>
                <Text style={{
                    fontSize: _widthScale(28),
                    marginTop: _heightScale(15),
                    marginBottom: _heightScale(10)
                }}>
                    Đăng nhập
                <Text style={{
                        color: BASE_COLOR
                    }}>
                        {`${` EC`}`}
                    </Text>
                </Text>

                <Text style={{
                    fontSize: _widthScale(14),
                    color: GREY_OPACITY
                }}>
                    Đăng nhập vào EC để thoải mái mua sắm, tìm sản phẩm phù hợp nhất với mình.
                </Text>

                <View style={{
                    marginTop: _heightScale(20),
                    flexDirection: 'row',
                    width: "100%",
                    height: _heightScale(48),
                    borderRadius: _widthScale(5),
                    borderColor: 'grey',
                    borderWidth: _widthScale(0.5),
                    alignItems: 'center'
                }}>
                    <Icon style={{ marginHorizontal: _widthScale(15) }} name={"mobile-phone"} size={_widthScale(26)} color={GREY_OPACITY} />
                    <TextInput
                        onChangeText={(content) => {
                            setphoneNumber(content)
                        }}
                        value={phoneNumber}
                        keyboardType={'numeric'}
                        style={{
                            flex: 1,
                            fontSize: _widthScale(16)
                        }}
                        placeholder={"Nhập số điện thoại"}
                    />
                </View>

                <View style={{
                    marginTop: _heightScale(20),
                    flexDirection: 'row',
                    width: "100%",
                    height: _heightScale(48),
                    borderRadius: _widthScale(5),
                    borderColor: 'grey',
                    borderWidth: _widthScale(0.5),
                    alignItems: 'center'
                }}>
                    <Icon style={{ marginHorizontal: _widthScale(15) }} name={"lock"} size={_widthScale(26)} color={GREY_OPACITY} />
                    <TextInput
                        onChangeText={(content) => {
                            setPassword(content)
                        }}
                        value={password}
                        secureTextEntry={true}
                        style={{
                            flex: 1,
                            fontSize: _widthScale(16)
                        }}
                        placeholder={"Nhập mật khẩu"}
                    />
                </View>

                <TouchableOpacity
                    onPress={() => {
                        // setShowModal(true)
                        _onConfirmSignIn()
                    }}
                    activeOpacity={.8}
                    style={{
                        width: '100%',
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
                        TIẾP TỤC
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate('SignUp')
                    }}
                    style={{
                        marginTop: _heightScale(20),
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                    <Text style={{
                        fontSize: _widthScale(15),
                        color: GREY_OPACITY
                    }}>
                        Chưa có tài khoản?
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: _widthScale(10)
                    }}>
                        <Icon name={"play"} />
                        <Text style={{
                            color: '#000',
                            fontWeight: '500'
                        }}>
                            {` Đăng ký`}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})


export default SignIn;