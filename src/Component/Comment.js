import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ImageBackground,
    Image
} from 'react-native';
import { _widthScale, _heightScale } from '../Constant/Scale';
import moment from 'moment'

const Comment = props => {
    return (
        <View
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
                    {`${props.data.authorName}  `}
                    <Text
                        style={[{
                            fontSize: _widthScale(14)
                        },
                        props.flag == 1 ?
                            { color: '#33AB43' }
                            :
                            { color: '#FF424E' }
                        ]}
                    >
                        {
                            props.flag == 1 ?
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
                        props?.data?.timeCreate ? 
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
                {props?.data?.content}
            </Text>
            <View style={{
                height: _widthScale(0.5),
                backgroundColor: 'rgba(182, 184, 182,0.4)',
                marginTop: _heightScale(10)
            }} />
        </View>
    );
};



export default Comment;