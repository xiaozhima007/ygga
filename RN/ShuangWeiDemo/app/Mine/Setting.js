
import React, {Component} from 'react';
import {StyleSheet, View, Text,Dimensions, ScrollView, Switch, TouchableNativeFeedback,SafeAreaView, TouchableOpacity, Platform, PixelRatio, BackAndroid,Image} from 'react-native';

import clear from 'react-native-clear-app-cache';
import CustomIconFont from '../Main/CustomIconFont';


const {width,height}=Dimensions.get('window');


export default class Setting extends Component{
    constructor(props){
        super(props);
        this.state={
            switcherValue:false,
            unit : '', // 缓存单位 
            cacheSize : "0", // 缓存 
        };
        clear.getAppCacheSize((value,unit)=>{                  
            // 这个一定要写在构造函数里面
            this.setState({                                    
            // 要是不写在里面，会报getAppCacheSize是Undefined
                cacheSize:parseInt(value), //缓存大小
                unit:unit  //缓存单位
                })
            });
    }


     // 清除缓存 
    clearCache(){ 
        clear.clearAppCache(() => {
        console.log("清除成功");
        clear.getAppCacheSize((value, unit) => {
            this.setState({
                cacheSize: value,   // 缓存大小
                unit: unit         // 缓存单位
                })
            });
        }); 
    }

    render(){
        return(
        <SafeAreaView style={styles.flex}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>新消息通知</Text>
                    <View style={[{flex:1,justifyContent:'flex-end'},styles.container]}>
                        <Switch
                            value={this.state.switcherValue}
                            onValueChange={(value)=>{
                                this.setState({
                                    switcherValue:value
                                })
                            }}
                            style={{marginRight:15}}
                        />
                    </View>
                </View>
                <TouchableOpacity>
                    <View style={[styles.container,{marginTop:1}]}>
                        <Text style={styles.title}>字体大小</Text>
                        <View style={[{flex:2,justifyContent:'flex-end'},styles.container]}>
                        <CustomIconFont name='right' size={15} color='#CCCCCC' style={{marginRight:15}}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.clearCache.bind(this)}>
                    <View style={[styles.container,{marginTop:1}]}>
                        <Text style={styles.title}>清除缓存</Text>
                        <View style={[{flex:2,justifyContent:'flex-end'},styles.container]}>
                            <Text style={{fontSize:16,color:'#999999'}}>{this.state.cacheSize+this.state.unit}</Text>
                            <CustomIconFont name='right' size={15} color='#CCCCCC' style={{marginRight:15}}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[styles.container,{marginTop:1}]}>
                        <Text style={styles.title}>检查更新</Text>
                        <View style={[{flex:2,justifyContent:'flex-end'},styles.container]}>
                        <CustomIconFont name='right' size={15} color='#CCCCCC' style={{marginRight:15}}/>
                        </View>
                    </View>
                </TouchableOpacity>
                
            </ScrollView>
            <TouchableOpacity>
                <View style={{height:45,backgroundColor:'white',marginLeft:0,marginBottom:0,marginRight:0,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:18,color:'#CF1322'}}>退出登录</Text>
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
  container:{
    flexDirection:'row',
    height:50,
    backgroundColor:'white',
    alignItems:'center'

  },
  title:{
    flex:1,
    fontSize:16,
    marginLeft:18,
  },
  

})