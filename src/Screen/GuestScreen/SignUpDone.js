import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, StatusBar, Image, ScrollView,TouchableOpacity } from 'react-native';
import { _widthScale, _heightScale } from '../../Constant/Scale';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_COLOR, GREY_OPACITY } from '../../Constant/Color'
import {  TextInput } from 'react-native-gesture-handler';

const SignUpDone = props => {
    return (
        <View style={styles.container}>
            <Image
                style={{
                    width: '100%',
                    height: _heightScale(250)
                }}
                resizeMode={'contain'}
                source={require('../../Image/coverSignUpDone.png')}
            />
            <Text style={{
                fontSize:_widthScale(22),
                alignSelf:'center',
                marginTop:_heightScale(20)
            }}>
                Đăng nhập thành công!
            </Text>
            <Text style={{
                fontSize:_widthScale(16),
                alignSelf:'center',
                marginTop:_heightScale(20),
                color:GREY_OPACITY
            }}>
                Chúc bạn có trải nghiệm tốt nhất ở EC
            </Text>

            <TouchableOpacity
                    onPress={()=>{
                        props.navigation.navigate('SignUpDone')
                    }}
                    activeOpacity={.8}
                    style={{
                        width: _widthScale(300),
                        alignSelf:'center',
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
    );
};

const styles = StyleSheet.create({

})

export default SignUpDone;