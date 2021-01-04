import React, { Component } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import { _widthScale, _heightScale } from '../../Constant/Scale';

class SplashScreen extends Component {
    render() {
        return (
            <View style={[styles.container]}>
                <StatusBar translucent={false} barStyle="light-content" backgroundColor={'red'} />
                {
                    Platform.OS == 'ios' &&
                    <View style={{
                        height: _heightScale(32),
                        // backgroundColor: ''
                    }} />
                }
                <Text>
                    SplashScreen
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default SplashScreen;