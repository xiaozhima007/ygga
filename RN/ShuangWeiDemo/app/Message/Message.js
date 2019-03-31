import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';


export default class Message extends Component{
    render(){
        return(
            <View style={styles.flex}>
                <Text>消息</Text>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    flex:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
});