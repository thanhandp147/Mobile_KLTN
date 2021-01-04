import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native'

class WelcomePage extends Component {
    componentDidMount() {
    	// do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>
                    123
                </Text>
            </View>
        );
    }
}

export default WelcomePage;