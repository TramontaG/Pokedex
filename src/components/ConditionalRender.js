import React from 'react';
import { View } from 'react-native'

const ConditionalRender = props => {
    if (props.visible){
        return props.children;
    } else {
        if (props.keepLoaded) {
            return <View style={{width: 0, height: 0}}>{props.children}</View>
        }
        return null;
    }
}

export default ConditionalRender;