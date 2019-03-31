
import React, {Component} from 'react';
import {
  Platform, StyleSheet, Text,
  View,StatusBar,SectionList,
  SafeAreaView,FlatList,
  TouchableOpacity,Dimensions,Image,ImageBackground,ScrollView,TextInput,Alert
} from 'react-native';

const {width,height}=Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class UpdateUserPassword extends Component{
  constructor(props){
    super(props);
    this.state={
      oldPassword:'',
      newPassword:'',
      verifyPassword:'',

    }
  }

  submitData(){
    if(this.state.newPassword.length===0||this.state.verifyPassword.length===0||this.state.oldPassword.length===0){
      Alert.alert(
        '',
        '密码不能为空,请输入密码!',
        [
          {text:'确认',onPress:()=>{
            console.log('用户点击确认')
          }}
        ]
      )
      return;
    }

    Alert.alert(
      '获取内容',
      `获取的输入内容${this.state.oldPassword}${this.state.newPassword}${this.state.verifyPassword}`,
      [
        {
          text:'取消',onPress:()=>console.log('点击取消')
        },
        {
          text:'确认',onPress:()=>console.log('点击确认')
        },
      ]
    )
  }


    render(){
      return(
        <SafeAreaView style={styles.flex}>
          <KeyboardAwareScrollView>
            <View style={styles.viewContainer}>
              <Text style={styles.text}>原密码</Text>
              <TextInput style={styles.textInput} clearButtonMode='while-editing' secureTextEntry={true} 
                onChangeText={(oldPassword)=>this.setState({oldPassword})}
              ></TextInput>
            </View>
            <View style={[styles.viewContainer,{marginTop:1}]}>
              <Text style={styles.text}>新密码</Text>
              <TextInput style={styles.textInput} clearButtonMode='while-editing' secureTextEntry={true}
                onChangeText={(newPassword)=>this.setState({newPassword})}
              ></TextInput>
            </View>
            <View style={[styles.viewContainer,{marginTop:1}]}>
              <Text style={styles.text}>确认密码</Text>
              <TextInput style={styles.textInput} clearButtonMode='while-editing' secureTextEntry={true}
                onChangeText={(verifyPassword)=>this.setState({verifyPassword})}
              ></TextInput>
            </View>
          </KeyboardAwareScrollView>
          <TouchableOpacity onPress={this.submitData.bind(this)}>
            <View style={{height:45,backgroundColor:'#5497CE',marginLeft:0,marginBottom:0,marginRight:0,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:18,color:'white'}}>提交</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
        
      );
    }
}

const styles=StyleSheet.create({
  flex:{
    flex:1,
    backgroundColor:'#F3F3F3'
  },
  viewContainer:{
    flexDirection:'row',
    height:50,
    backgroundColor:'white',
    alignItems:'center'

  },
  text:{
    flex:1,
    fontSize:16,
    marginLeft:18,
  },
  textInput:{
    flex:2,
    height:40,
    marginRight:10,
    textAlign:'right',
  },
  partingLine:{
    height:0.5,
    width:width-18,
    backgroundColor:'#E5E5E5',
    marginLeft:18,
    marginTop:49.5
  }

});


 