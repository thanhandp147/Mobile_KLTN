import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native'

const Nothing = props => {
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>
                infoHere
            </Text>
        </View>
    );
};


export default Nothing;