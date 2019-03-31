import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';


export default class AddressList extends Component{
    render(){
        return(
            <View style={styles.flex}>
                <Text>通讯录</Text>
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