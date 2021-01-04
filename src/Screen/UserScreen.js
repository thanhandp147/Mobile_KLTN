import React, { Component } from 'react';
import { View, StyleSheet, Text, StatusBar,TouchableOpacity } from 'react-native';
import { _widthScale, _heightScale } from '../Constant/Scale';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_COLOR, GREY_OPACITY } from '../Constant/Color'
import { connect } from 'react-redux'
import * as ActionType from "../Redux/Constants/ActionType";
import Store from '../Redux/Store'
import AsyncStorage from '@react-native-community/async-storage'
import Axios from 'axios'


class UserScreen extends Component {

    _logout = () => {
        AsyncStorage.clear();
        Store.dispatch({
            type: ActionType.LOGOUT,
        })
        Axios.defaults.headers.token = null;
    }

    render() {
        console.log(this.props.infoUser);

        return (
            <View style={[styles.container]}>
                <TouchableOpacity
                    disabled={this.props?.infoUser?.name ? true : false}
                    onPress={() => {
                        this.props.navigation.navigate('SignIn')
                    }}
                    activeOpacity={0.8}
                    style={styles.user}>
                    <Icon name="user-circle" color={"#33AB43"} size={_widthScale(55)} />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flex: 1
                    }}>
                        <View style={{ marginLeft: _widthScale(20) }}>

                            {
                                this.props?.infoUser?.name ?
                                    <>
                                        <Text style={{
                                            fontSize: _widthScale(16),
                                            color: BASE_COLOR
                                        }}>
                                            {`Xin chào ${this.props.infoUser.name}`}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={this._logout}
                                            style={{ marginTop: _heightScale(10) }}>
                                            <Text>
                                                Đăng xuất
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                    :
                                    <Text style={{
                                        fontSize: _widthScale(16),
                                        color: BASE_COLOR
                                    }}>
                                        Đăng nhập/Đăng ký
                                    </Text>
                            }

                        </View>
                        <Icon name={'chevron-right'} color={BASE_COLOR} />
                    </View>
                </TouchableOpacity>

                <View style={styles.body}>
                    <TouchableOpacity
                        activeOpacity={.8}
                        style={styles.btnUser}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Icon size={_widthScale(24)} name={'cart-arrow-down'} color={GREY_OPACITY} />
                            <Text style={{
                                fontSize: _widthScale(16),
                                marginLeft: _widthScale(15),
                                color: GREY_OPACITY
                            }}>
                                Giỏ hàng của bạn
                            </Text>
                            <View style={{
                                width: _widthScale(20),
                                height: _widthScale(20),
                                borderRadius: _widthScale(10),
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'red',
                                marginLeft: _widthScale(10)
                            }}>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: _widthScale(11),
                                    fontWeight: 'bold'
                                }}>
                                    10
                                </Text>
                            </View>
                        </View>
                        <Icon name={'chevron-right'} color={BASE_COLOR} />
                    </TouchableOpacity>
                    <View style={{ height: _heightScale(0.5), backgroundColor: 'rgba(182, 184, 182,0.4)' }} />

                    <TouchableOpacity
                        activeOpacity={.8}
                        style={styles.btnUser}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Icon size={_widthScale(24)} name={'money'} color={GREY_OPACITY} />
                            <Text style={{
                                fontSize: _widthScale(16),
                                marginLeft: _widthScale(15),
                                color: GREY_OPACITY
                            }}>
                                Sản phẩm đã mua
                            </Text>
                        </View>
                        <Icon name={'chevron-right'} color={BASE_COLOR} />
                    </TouchableOpacity>
                    <View style={{ height: _heightScale(0.5), backgroundColor: 'rgba(182, 184, 182,0.4)' }} />

                    <TouchableOpacity
                        activeOpacity={.8}
                        style={styles.btnUser}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Icon size={_widthScale(24)} name={'eye'} color={GREY_OPACITY} />
                            <Text style={{
                                fontSize: _widthScale(16),
                                marginLeft: _widthScale(15),
                                color: GREY_OPACITY
                            }}>
                                Sản phẩm đã xem
                            </Text>
                        </View>
                        <Icon name={'chevron-right'} color={BASE_COLOR} />
                    </TouchableOpacity>
                    <View style={{ height: _heightScale(0.5), backgroundColor: 'rgba(182, 184, 182,0.4)' }} />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    infoUser: state.userReducer.infoUser,
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    user: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: _widthScale(18),
        paddingVertical: _heightScale(15)
    },
    body: {
        marginTop: _heightScale(10),
        backgroundColor: '#fff'
    },
    btnUser: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: _heightScale(10),
        paddingHorizontal: _widthScale(18),
        justifyContent: 'space-between'
    }
})

export default connect(mapStateToProps, {})(UserScreen);
