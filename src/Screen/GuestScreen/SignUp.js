import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, StatusBar, Image, ScrollView,TouchableOpacity } from 'react-native';
import { _widthScale, _heightScale } from '../../Constant/Scale';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_COLOR, GREY_OPACITY } from '../../Constant/Color'
import {  TextInput } from 'react-native-gesture-handler';

const SignUp = props => {
    const [gender, setGender] = useState(null)

    const _setGender = (gender) => {
        setGender(gender)
    }

    return (

        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps='handled'
        >

            <View style={{
                paddingHorizontal: _widthScale(30),
                marginTop:_heightScale(20)
            }}>
                <Text style={{
                    fontSize: _widthScale(28),
                    marginTop: _heightScale(15),
                    marginBottom: _heightScale(10)
                }}>
                    Đăng ký
                </Text>

                <Text style={{
                    fontSize: _widthScale(14),
                    color: GREY_OPACITY
                }}>
                    Vui lòng điền thông tin dưới đây để xác thực tài khoản của bạn!
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
                    <Icon style={{ marginHorizontal: _widthScale(15) }} name={"address-book-o"} size={_widthScale(18)} color={GREY_OPACITY} />
                    <TextInput
                        style={{
                            flex: 1,
                            fontSize: _widthScale(16)
                        }}
                        placeholder={"Nhập Email của bạn"}
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
                    <Icon style={{ marginHorizontal: _widthScale(15) }} name={"address-book-o"} size={_widthScale(18)} color={GREY_OPACITY} />
                    <TextInput
                        style={{
                            flex: 1,
                            fontSize: _widthScale(16)
                        }}
                        placeholder={"Nhập Tên của bạn"}
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
                        secureTextEntry={true}
                        style={{
                            flex: 1,
                            fontSize: _widthScale(16)
                        }}
                        placeholder={"Nhập mật khẩu"}
                    />
                </View>

                <View style={{ marginTop: _heightScale(20), flexDirection: 'row', alignItems: 'center' }}>
                    <Text>
                        Giới tính:
                    </Text>
                    <TouchableOpacity
                        onPress={() => _setGender(1)}
                        style={[styles.iconGender, gender == 1 && { borderColor: BASE_COLOR }]}>
                        <Icon name={'mars'} size={_widthScale(17)} color={gender == 1 ? `${BASE_COLOR}` : `#000`} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => _setGender(0)}
                        style={[styles.iconGender, gender == 0 && { borderColor: BASE_COLOR }]}>
                        <Icon name={'venus'} size={_widthScale(17)} color={gender == 0 ? `${BASE_COLOR}` : `#000`} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    
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

            </View>

        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    iconGender: {
        width: _widthScale(30),
        height: _widthScale(30),
        borderRadius: _widthScale(15),
        borderWidth: _widthScale(1),
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: _widthScale(20)
    }
})

export default SignUp;