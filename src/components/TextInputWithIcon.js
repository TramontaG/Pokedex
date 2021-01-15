import React from "react";
import {Image, View, TextInput, StyleSheet } from 'react-native';

const TextInputWithIcon = props => (
    <View style={{...Styles.container, backgroundColor: props.backgroundColor? props.backgroundColor : '#FFF' }}>
        <Image source={props.icon} style={{...Styles.icon, opacity: props.iconOpacity}} />
        <TextInput {...props}/>
    </View>
)

const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderColor: '#000',
        height: 40,
        borderRadius: 5,
        marginVertical: 10,
    },
    icon: {
        padding: 10,
        margin: 5,
        marginLeft: 10,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    }
})

export default TextInputWithIcon;