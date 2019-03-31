
import React, {Component} from 'react';
import {
  Platform, StyleSheet, Text,
  View,StatusBar,SectionList,
  SafeAreaView,FlatList,
  TouchableOpacity,Dimensions,Image,ImageBackground,ScrollView,TouchableHighlight
} from 'react-native';
import CustomIconFont from '../Main/CustomIconFont';
import ImagePicker from 'react-native-image-picker';


const options = {
    //底部弹出框选项
    title:'请选择图片',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'相册',
    quality:0.75,
    // allowsEditing:true,
    // noData:false,
    storageOptions: {
        skipBackup: true,
        path:'images'
    }
}

const {width,height}=Dimensions.get('window');

export default class MineDetail extends Component{
    
    constructor(props){
        super(props);
        this.state={
            imageSource:{uri:'Mine_header'}
        };
    }



    _goToUpdatePasswordPage(){
        this.props.navigation.navigate('UpdatePassword');
    }

    _updateHeader(){
        ImagePicker.showImagePicker(options,(respose)=>{
            if(respose.didCancel){
            //   AlertIOS.alert('提示','用户点击了取消',[
            //     {
            //       text:'取消',
            //       onPress:()=>{
            //         console.log('点击取消按钮');
            //       }
            //     },
            //     {
            //       text:'确认',
            //       onPress:()=>{
            //         console.log('点击确认按钮');
            //       }
            //     }
            //   ])
            }else if(respose.error){
      
            }else if(respose.customButton){
      
            }else{
              let source={uri:respose.uri};
              this.setState({
                imageSource:source
              });
            }
        })
    }
    

    render(){
        return(
                <View style={styles.container}>
                    <ScrollView style={styles.container}>
                        <TouchableHighlight onPress={this._updateHeader.bind(this)}>
                            <View style={{height:60,backgroundColor:'white',flexDirection:'row',alignItems:'center'}}>
                                <Text style={styles.title}>头像</Text>
                                <View style={{flex:2,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                    <Image source={this.state.imageSource} style={{width:44,height:44,marginRight:5,borderRadius:22}}/>
                                    {/* <Image source={{uri:'right_ arrows'}} style={[styles.arrows,{marginRight:15}]}/> */}
                                    <CustomIconFont name='right' size={15} color='#CCCCCC' style={{marginRight:15}}/>
                                </View>
                                
                            </View>
                        </TouchableHighlight>
                        <View style={styles.touchContainer}>
                            <Text style={styles.title}>姓名</Text>
                            <Text style={{fontSize:16,marginRight:20,color:'#E5E5E5'}}>张三</Text>
                        </View>
                        <TouchableOpacity>
                            <View style={{height:50,backgroundColor:'white',flexDirection:'row',alignItems:'center',marginTop:1}}>
                                <Text style={styles.title}>手机号</Text>
                                <View style={{justifyContent:'flex-end',flex:2,height:50,alignItems:'center',flexDirection:'row'}}>
                                    <Text style={{fontSize:16,marginRight:5,color:'#333333'}}>17512594706</Text>
                                    {/* <Image source={{uri:'right_ arrows'}} style={[styles.arrows,{marginRight:15}]}/> */}
                                    <CustomIconFont name='right' size={15} color='#CCCCCC' style={{marginRight:15}}/>
                                </View>
                        
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._goToUpdatePasswordPage.bind(this)}>
                            <View style={styles.touchContainer}>
                                <Text style={styles.title}>修改密码</Text>
                                {/* <Image source={{uri:'right_ arrows'}} style={[styles.arrows,{marginRight:15}]}/> */}
                                <CustomIconFont name='right' size={15} color='#CCCCCC' style={{marginRight:15}}/>
                            </View>
                        </TouchableOpacity>
                        
                    </ScrollView>
                </View> 
            
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F3F3F3'
    },
    touchContainer:{
        height:50,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:1
    },
    title:{
        flex:1,
        fontSize:16,
        marginLeft:20
    },
    arrows:{
        height:17,
        width:12
    }
});
