import React, {Component} from 'react';
import {
    Platform, 
    StyleSheet, 
    Text, 
    View,
    ScrollView,
    Dimensions,
    Image,
    StatusBar,
    TouchableHighlight,
    Alert,FlatList,
    TouchableOpacity,
    TouchableNativeFeedback,
    TextInput
} from 'react-native';
const {width,height}=Dimensions.get('window');


export default class HaveApprove extends Component{
    render(){
        return(
            <View style={styles.flex}>

            </View>
        )
    }
}

const styles=StyleSheet.create({
    flex:{
        flex: 1,
        backgroundColor: '#F3F3F3',
    }
})